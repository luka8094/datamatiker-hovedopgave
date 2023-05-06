<script>
    import {authorized} from "../stores/sysdll"
    import {useNavigate, useLocation} from "svelte-navigator"

    import {onMount, beforeUpdate, afterUpdate, onDestroy} from "svelte"
    import {getCookie} from "svelte-cookie"
    let email, password, googleLink

    const navigate = useNavigate()
    const location = useLocation()

    onMount(async () => {
        const oAuth = document.location.hash
        if(oAuth === "#0"){ 
            console.log("#0", getCookie('jwt'))
            navigate("/_")
        }

        const response = await fetch("/api/google")
        const {data} = await response.json()
        const cookie = getCookie('jwt')

        console.log("cookie check:", cookie)

        googleLink.href = data
    })

    async function login(){
        const response = await fetch("/api/login",{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email.value, 
                password: password.value
            })
        })
            
        const {data} = await response.json()
        console.log(data)
        $authorized = data
        
        if(response.status === 200 && $authorized){
            navigate("/_")   
        }
    }
</script>

<section>
    <div id="background-animation">
    </div>
    <div id="logo">
        <h1>Obsidian mindbench</h1>
    </div>
    <form on:submit|preventDefault={login}>
        <fieldset>
            <h1>Sign in</h1>
            <label for="user-email">Email:</label>
            <input bind:this={email} type="email" name="user-email" placeholder="email">
            <label for="user-password">Password:</label>
            <input bind:this={password} type="password" name="user-password" placeholder="password">
            <input name="submit" type="submit" value="sign in">
            <p>or</p>
            <div id="google-signin">
                <a bind:this={googleLink} href={undefined}>
                    <span>Google sign-in</span>
                    <img src="/google_logo.png" alt="Google sign in"/>
                </a>
            </div>
        </fieldset>
    </form>
</section>

<style>
    h1{
        font-size: 2em;
    }

    fieldset h1{
        color: blue;
    }

    h1:focus{
        outline: none;
    }

    #background-animation{
        display: flex;
        position: absolute;
        height: 100vh;
        width: 5000px;
        z-index: -10;
        color: white;
        background: linear-gradient(45deg, lightblue, lightblue, #07EEC7, white);
        animation: background-animation 20s infinite; 
    }

    section{
        display: flex;
        position: relative;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        overflow: hidden;
    }

    section div h1{
        text-align: center;
    }

    form, fieldset{
        display: flex;
        flex-direction: column;
        border: none;
        height: fit-content;
        background: white;
    }

    form{
        margin: 0 auto;
        justify-content: center;
        padding-bottom: 15px;
        color: black;
        border-radius: 10px;
        margin-bottom: auto;
    }

    fieldset{
        align-items: center;
        padding: 0 40px;
        height: inherit;
        border-radius: 10px;
    }

    fieldset h1{
        margin: 20px;
    }

    #google-signin{
        height: fit-content;
        display: flex;
        width: 100%;
        padding: 10px 0;
    }

    #google-signin a{
        height: 40px;
        width: 100%;
        border: solid 1px black;
        border-radius: 10px;
        color: black;
    }

    img{
        object-fit: contain;
        height: 20px;
        width: 20px;
    }

    label{
        margin-right: auto;
    }

    input{
        margin: 10px 0;
    }

    label{
        color: blue;
        font-weight: 500;;
    }

    input[type="email"],
    input[type="password"]{
        width: 200px;
        height: 35px;
        padding: 15px;
        border: solid 1px black;
        border-radius: 3px;
    }

    input[type="email"]::placeholder,
    input[type="password"]::placeholder{
        color: lightgrey;
    }

    input[type="submit"],
    a{
        display: flex;
        height: 35px;
        width: 100%;
        align-items: center;
        padding: 0;
        justify-content: center;
        border-radius: 10px;
        outline: none;
        border: solid 1px black;
        background: white;
        font-weight: 900;
        margin-bottom: 20px;
    }

    a{
        display: flex;
        justify-content: space-between;
        padding: 0 25px;
        font-weight: 900;
    }

    a span{
        line-height: 15px;
    }

    p{
        color: black;
        width: 100%;
        display: flex;
        text-align: center;
        margin: 10px 0;
    }

    P::after, p::before{
        display: flex;
        content: '';
        height: .5px;
        width: 85px;
        background: black;
        align-self: center;
    }

    p::before{
        margin-right: auto;
    }

    p::after{
        margin-left: auto;
    }

    #logo{
        display: flex;
        height: 150px;
        width: 150px;
        background: linear-gradient(180deg, blue, white);;
        margin: auto auto 30px;
        border-radius: 100px;
        align-items: center;
        justify-content: center;
        color: black;
    }

    #logo h1{
        font-size: 1.5em;
    }

    @keyframes background-animation{
        0%{
            left: 0;
        }
        50%{
         
           left: -2000px;
        }
        100%{
            left: 0;
        }
    }
</style>
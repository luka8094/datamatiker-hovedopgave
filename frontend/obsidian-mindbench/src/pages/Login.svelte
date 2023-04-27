<script>
    import {useNavigate} from "svelte-navigator"
    import {authorized} from "../stores/sysdriver"
    let username, password

    const navigate = useNavigate()

    async function login(e){
        const response = await fetch("/api/login",{
            method: 'POST'
        })

        const {data} = await response.json()
        console.log(data)
        $authorized = data

        if($authorized){
            navigate("/@app")   
        }
    }

    function signupRedirect(){
        navigate("/signup")
    }
</script>

<section>
    <div id="logo">
        <h1>Obsidian mindbench</h1>
    </div>
    <form on:submit|preventDefault={login}>
        <fieldset>
            <h1>Sign in</h1>
            <label for="">Username:</label>
            <input bind:this={username} type="text" name="username" placeholder="username">
            <label for="">Password:</label>
            <input bind:this={password} type="password" name="password" placeholder="password">
            <input name="submit" type="submit" value="sign in">
            <div id="google-signin">
                <input type="submit" value="Google sign-in">
            </div>
        </fieldset>
    </form>
    <div id="signup">
        <p>No account?</p><button on:click={signupRedirect}>sign up here!</button>
    </div>
</section>

<style>
    h1{
        font-size: 2em;
    }

    h1:focus{
        outline: none;
    }

    section{
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }

    section div h1{
        text-align: center;
    }

    form, fieldset{
        display: flex;
        flex-direction: column;
        border: none;
        height: fit-content;
    }

    form{
        width: 250px;
        margin: 0 auto;
        border: solid 1px black;
        justify-content: center;
        background: rgba(0,0,190, .5);
    }

    fieldset{
        align-items: center;
        padding: 0 40px;
        height: inherit;
    }

    fieldset h1{
        margin: 20px;
    }

    #google-signin{
        height: fit-content;
        display: flex;
        width: 100%;
        border-top: solid 1px black;
        padding: 10px 0;
    }

    #google-signin input{
        height: 40px;
        width: 100%;
    }

    label{
        margin-right: auto;
    }

    input{
        margin: 10px 0;
    }

    input[name="submit"]{
        width: 100%;
    }

    #logo{
        display: flex;
        height: 150px;
        width: 150px;
        background: linear-gradient(180deg, blue, transparent);;
        margin: auto auto 30px;
        border-radius: 100px;
        align-items: center;
        justify-content: center;
    }

    #logo h1{
        font-size: 1.5em;
    }

    #signup{
        width: fit-content;
        display: flex;
        align-items: center;
        margin: 0 auto auto;
        font-size: 12px;
    }

    #signup button{
        padding: 5px;
    }
</style>
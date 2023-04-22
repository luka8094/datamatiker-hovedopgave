<script>
    import {useNavigate} from "svelte-navigator"
    import {authorized} from "../stores/sysdriver"
    let username, password

    const navigate = useNavigate()

    function login(){
        if(username.value === "testuser" && password.value === "password"){ 
            console.log("login credentials accepted!")
            $authorized = true
            navigate("/dashboard")
        }
        else console.log("access denied!")
    }
</script>

<section>
    <form on:submit={login}>
        <fieldset>
            Login
            <label for="">Username:</label>
            <input bind:this={username} type="text" name="username" placeholder="username">
            <label for="">Password:</label>
            <input bind:this={password} type="password" name="password" placeholder="password">
            <input type="submit" placeholder="send">
        </fieldset>
    </form>
</section>

<style>
    section{
        display: flex;
        height: 100vh;
        width: 100%;
        background: lightblue;
    }

    form, fieldset{
        display: flex;
        flex-direction: column;
    }

    form{
        height: 300px;
        width: 250px;
        margin: auto;
    }

    fieldset{
        align-items: center;
    }

    input{
        margin: 10px 0;
    }
</style>
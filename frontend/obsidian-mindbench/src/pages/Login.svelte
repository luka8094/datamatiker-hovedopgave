<section>
    <form>
        <fieldset>
            Login
            <label for="">Username:</label>
            <input type="text" name="username" placeholder="username">
            <label for="">Password:</label>
            <input type="password" name="password" placeholder="password">
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
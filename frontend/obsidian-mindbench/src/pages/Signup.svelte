<script>
    import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    function loginRedirect(){
        navigate("/")
    }
</script>

<section>
    <h1>Signup page</h1>
    <button on:click={loginRedirect}>Back to login page</button>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        background: rgba(100,100,10,.5);
        justify-content: center;
        align-items: center;
    }

    button{
        height: 100px;
        width: fit-content;
    }
</style>
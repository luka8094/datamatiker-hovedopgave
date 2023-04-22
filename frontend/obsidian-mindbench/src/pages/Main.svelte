<script>
    import {authorized} from "../stores/sysdriver"
    import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    $: if(!$authorized){
        navigate("/")
    }
</script>

<section>
    <h1>Welcome to the dashboard</h1>
</section>

<style>
    section{
        display: flex;
        height: 100vh;
        width: 100%;
        justify-content: center;
    }
    
    h1{
        margin: auto;
    }
</style>
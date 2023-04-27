<script>
    import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    setTimeout(() => {
        navigate("/@app")
    }, 5000)
</script>

<section>
    Loading...
</section>

<style>
    section{
        display: flex;
        height: 100vh;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
</style>
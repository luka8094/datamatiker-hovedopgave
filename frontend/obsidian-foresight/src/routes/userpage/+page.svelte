<script>
    import {browser} from "$app/environment"
    import {goto} from "$app/navigation";
    import {authorized} from "../../stores/mainsys";
    /*import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    $: if(!$authorized){
        navigate("/")
    }*/

    $: if(browser && !$authorized){
        goto("/")
    }
</script>

<section>
    <aside>

    </aside>
    <div>

    </div>
</section>

<style>
    section{
        display: flex;
        height: 100vh;
        width: 100%;
        overflow: hidden;
    }

    aside{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 250px;
        border: dashed 1px black;
        background: rgba(100, 0, 100, 1);
    }

    div{
        display: flex;
        height: 100%;
        width: inherit;
        background: rgba(255, 0, 255, 0.9);
    }
</style>
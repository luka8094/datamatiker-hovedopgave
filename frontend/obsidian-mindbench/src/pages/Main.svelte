<script>
    import {authorized} from "../stores/sysdriver"
    import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    $: if(!$authorized){
        navigate("/")
    }
</script>

<section>
    <aside id="user-history">

    </aside>
    <div>
        <h1>Welcome to the dashboard</h1>
    </div>
</section>

<style>
    section{
        display: flex;
        height: 100vh;
        width: 100%;
        justify-content: center;
    }
    
    #user-history{
        display: flex;
        flex-direction: column;
        width: 300px;
        background: rgba(200,0,200,.5);
        overflow: hidden;
        overflow-y: scroll;
    }

    div{
        display: flex;
        width: calc(100% - 300px);
        height: inherit;
    }

    h1{
        margin: auto;
        text-align: center;
    }
</style>
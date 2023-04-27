<script>
    import {authorized} from "../stores/sysdriver"
    import {useNavigate} from "svelte-navigator"

    import Prediction from "../components/Dashboard/Prediction.svelte"
    import Custom from "../components/Dashboard/Custom.svelte"
    import Splash from "../components/Dashboard/Splash.svelte"
    import Archive from "../components/Dashboard/Archive.svelte"

    import HistoryElement from "../components/Dashboard/UserHistory/HistoryElement.svelte"

    const testArray = ["test", "test", "test","test", "test", "test"]

    const navigate = useNavigate()

    function logout(){
        navigate("/")
    }

    let VIEW = Splash
</script>

<section>
    <nav>
        <div id="logo">
        </div>    
        <div id="menu-container">
            <button on:click={() => logout()}>Logout</button>
            <button on:click={() => console.log("Report subpage in development")}>Settings</button>
            <button on:click={() => console.log("Report subpage in development")}>Report</button>
            <button on:click={() => VIEW = Archive}>Archive</button>
            <button on:click={() => VIEW = Prediction}>Tester</button>
            <button on:click={() => VIEW = Custom}>Create model</button>
            <button on:click={() => VIEW = Splash}>Dashboard</button>
        </div>
    </nav>
    <div>
        <aside id="user-history">
            <!--<p>Historik</p>-->
            {#each testArray as test}
                <HistoryElement fileName={test}/>
            {/each}
        </aside>
        <svelte:component this={VIEW}/>
    </div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        justify-content: center;
        overflow: hidden;
    }

    section div{
        display: flex;
        height: calc(100vh - 70px);
        width: 100%;
    }
    
    nav{
        display: flex;
        height: 70px;
        background: white;
        border-bottom: solid 1px black;
    }

    #logo{
        display: flex;
        height: 50px;
        width: 50px;
        border-radius: 50px;
        background: linear-gradient(360deg, #0064e1, white);
        margin: auto auto auto 100px;
    }

    #user-history{
        display: flex;
        flex-direction: column;
        width: 300px;
        background: #0064e1;
        overflow: hidden;
        overflow-y: scroll;
    }

    #user-history::-webkit-scrollbar{
        width: 15px;
        background: rgba(255,255,255,.1);
    }

    #user-history::-webkit-scrollbar-thumb{
        display: flex;
        width: 5px;
        background: rgba(255,255,255,.5);
    }

    #menu-container{
        display: flex;
        height: auto;
        width: fit-content;
        margin: 0 50px 0 auto;
    }

    button{
        height: inherit;
        outline: 0;
        border-radius: 0;
        background: transparent;
    }

    button:hover{
        outline: none;
    }
</style>
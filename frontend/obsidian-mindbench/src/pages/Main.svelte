<script>
    import {authorized, resizeView} from "../stores/sysdriver"
    import {useNavigate} from "svelte-navigator"

    import Forecast from "../components/Dashboard/Forecast.svelte"
    import Custom from "../components/Dashboard/Custom.svelte"
    import Splash from "../components/Dashboard/Splash.svelte"
    import Archive from "../components/Dashboard/Archive.svelte"

    import HistoryElement from "../components/Dashboard/UserHistory/HistoryElement.svelte"
    
    let fileHistory
    let VIEW = Splash
    const testArray = ["test", "test", "test","test", "test", "test", "test", "test", "test","test", "test", "test"]

    const navigate = useNavigate()

    function hideFileHistory(){
        if(fileHistory.style.left != "-250px"){
            fileHistory.style.left = "-250px"
            fileHistory.style.marginRight = "-300px"
            $resizeView = true

            Array.from(fileHistory.children).forEach((fileItem, i) => {
                if(fileItem.tagName == "div") fileItem.style.opacity = ".5;"
            })
        }
        else{ 
            Array.from(fileHistory.children).forEach(fileItem => {
                if(fileItem.tagName == "div") fileItem.style.opacity = "1;"
            })

            fileHistory.style.left = "0" 
            $resizeView = false
        }
    }

    function logout(){
        $authorized = false
        navigate("/")
    }
</script>

<section>
    <nav>
        <div id="logo">
            <h2>Obsidian mindbench</h2>
        </div>    
        <div id="menu-container">
            <button on:click={() => logout()}><img src="/logout.svg" title="logout" alt="logout"/></button>
            <button on:click={() => console.log("BQ link subpage in development")}><img src="/big_query.svg" title="BigQuery integration" alt="BigQuery integration"></button>
            <button on:click={() => console.log("Dataview subpage in development")}><img src="/dataview.svg" title="datasheet view" alt="datasheet view"/></button>
            <button on:click={() => console.log("Report subpage in development")}><img src="/report.svg" title="get report" alt="get report"></button>
            <button on:click={() => VIEW = Archive}><img src="/archive.svg" title="files archive" alt="files archive"/></button>
            <button on:click={() => VIEW = Forecast}><img src="/model_tester.svg" title="model test" alt="model test"/></button>
            <button on:click={() => VIEW = Custom}><img src="/create_model.svg" title="create model" alt="create model"/></button>
            <button on:click={() => VIEW = Splash}><img src="/dashboard.svg" title="dashboard" alt="dashboard"/></button>
        </div>
    </nav>
    <div style:class={ $resizeView ? 'reshapeSpace' : ''}>
        <aside bind:this={fileHistory} id="user-history">
            <h1>Workspace shortcuts
                <button on:click={hideFileHistory} title="Show work history">
                    <div class="line line-one"></div>
                    <div class="line line-two"></div>
                </button>
            </h1>
            <div>
                {#each testArray as test}
                    <HistoryElement fileName={test}/>
                {/each}
            </div>
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

    img{
        height: 50px;
    }

    #logo{
        display: flex;
        height: 50px;
        width: 50px;
        border-radius: 50px;
        background: linear-gradient(360deg, #0064e1, white);
        margin: auto auto auto 100px;
    }

    #logo h2{
        display: flex;
        position: absolute;
        height: 50px;
        width: 200px;
        top: 20px;
        font-size: 15px;
        padding: 0 10px;
    }

    #logo h2:focus{
        outline: none;
    }

    #user-history{
        display: block;
        position: relative;
        flex-direction: column;
        width: 300px;
        transition: all .5s ease-in-out;
        z-index: 1;
    }

    #user-history div{
        display: flex;
        flex-direction: column;
        width: 100%;
        background: rgba(0,0,0,.2);
        overflow: hidden;
        overflow-y: scroll;
    }

    #user-history h1{
        display: flex;
        position: absolute;
        background: linear-gradient(180deg, blue, blue, transparent);
        height: 60px;
        width: 300px;
        color: white;
        font-size: 1.3em;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        z-index: 1;
    }

    #user-history h1 button{
        display: flex;
        position: relative;
        height: 20px;
        width: 20px;
        background: rgba(255,255,255,.5);
        border-radius: 5px;
    }

    button .line{
        display: flex;
        position: absolute;
        width: 20px !important;
        height: 2px !important;
        background: white !important;
    }

    .line-one{
        left: calc(50% - 10px);
        transform: rotate(45deg);
        z-index: 1;
    }

    .line-two{
        left: calc(50% - 10px);
        transform: rotate(-45deg);
        z-index: 2;
    }

    #user-history div::-webkit-scrollbar{
        width: 15px;
        background: rgba(255,255,255,.1);
    }

    #user-history div::-webkit-scrollbar-thumb{
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
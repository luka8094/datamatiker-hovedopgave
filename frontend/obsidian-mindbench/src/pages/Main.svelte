<script>
    import {onMount, onDestroy} from "svelte"
    import {authorized, resizeView, workspaceHistory, temporaryStorage, archiveStorage, bigQuery, user} from "../stores/sysdll"
    import {useNavigate} from "svelte-navigator"

    import Dataview from "../components/Dashboard/Dataview.svelte"
    // @ts-ignore
    import Forecast from "../components/Dashboard/Forecast.svelte"
    import Custom from "../components/Dashboard/Custom.svelte"
    import Splash from "../components/Dashboard/Splash.svelte"
    import Archive from "../components/Dashboard/Archive.svelte"
    import BigQuery from "../components/Dashboard/BigQuery.svelte"

    import HistoryElement from "../components/Dashboard/UserHistory/HistoryElement.svelte"
    
    let fileHistory, 
        fileHistoryButton
    let VIEW = Splash

    const navigate = useNavigate()

    function hideFileHistory(){
        if(fileHistory.style.left != "-250px"){
            fileHistory.style.left = "-250px"
            fileHistory.style.marginRight = "-300px"
            fileHistoryButton.children[0].style.transform = "rotate(90deg)"

            $resizeView = true
            
            Array.from(fileHistory.children).forEach((fileItem, i) => {
                if(fileItem.tagName == "DIV") fileItem.style.opacity = ".5;"
            })
        }
        else{ 
            Array.from(fileHistory.children).forEach(fileItem => {
                if(fileItem.tagName == "DIV") fileItem.style.opacity = "1;"
            })
            fileHistoryButton.children[0].style.transform = "rotate(0deg)"

            fileHistory.style.left = "0" 
            $resizeView = false
        }
    }

    function updateHistoryElements(event){
        let historyElements = $workspaceHistory
        historyElements = historyElements.filter(({filename}) => event.detail.value !== filename)
        
        $workspaceHistory = historyElements
        $workspaceHistory = $workspaceHistory
    }

    async function logout(){
        const response = await fetch("/api/logout", {
            method: 'DELETE'
        })

        if(response.status === 200){
            $workspaceHistory = []
            $archiveStorage = []
            $temporaryStorage = []
            $authorized = false
            $user = null
            $bigQuery = false

            navigate("/")
        }
    }

    onMount(() => {
        setTimeout(() =>{
            fileHistoryButton.click()
            },
            1500
        )
    })

    onDestroy(() => {
        const userworkFiles = $archiveStorage
        const filesWorker = new Worker("/scripts/filesWorker.js")

        filesWorker.postMessage(userworkFiles)
    })
</script>

<section>
    <nav>
        <div id="logo">
            <h2>Obsidian mindbench</h2>
        </div>    
        <div id="menu-container">
            <button on:click={() => logout()}><img src="/logout.svg" title="logout" alt="logout"/></button>
            {#if $bigQuery}
                <button on:click={() => VIEW = BigQuery}><img src="/big_query.svg" title="BigQuery integration" alt="BigQuery integration"></button>
            {/if}
            <button on:click={() => VIEW = Dataview}><img src="/dataview.svg" title="datasheet view" alt="datasheet view"/></button>
            <button on:click={() => VIEW = Archive}><img src="/archive.svg" title="files archive" alt="files archive"/></button>
            <button on:click={() => VIEW = Forecast}><img src="/model_tester.svg" title="model test" alt="model test"/></button>
            <button on:click={() => VIEW = Custom}><img src="/create_model.svg" title="create model" alt="create model"/></button>
            <button on:click={() => VIEW = Splash}><img src="/dashboard.svg" title="dashboard" alt="dashboard"/></button>
        </div>
    </nav>
    <div style:class="{ $resizeView ? 'reshapeSpace' : ''}">
        <aside bind:this={fileHistory} id="user-history">
            <h1>Workspace shortcuts
                <button bind:this={fileHistoryButton} on:click={hideFileHistory} title="Show work history">
                    <div class="line line-one"></div>
                    <div class="line line-two"></div>
                </button>
            </h1>
            <div id="workspace-container">
                {#if $workspaceHistory.length !== 0 }
                    {#each $workspaceHistory as item}
                        <HistoryElement 
                        fileName={item.filename}
                        filetype={item.filetype}
                        on:removeHistoryElement={updateHistoryElements}
                        />
                    {/each}
                {:else }
                    <p id="workspace-message">No recent workfiles</p>
                {/if}
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

    aside{
        transition: all .5s ease-in-out;
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
        background: linear-gradient(360deg, var(--obsidian-key-color-one), white);
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

    #user-history div#workspace-container{
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #D8D8D8;
        overflow: hidden;
        overflow-y: scroll;
    }

    #user-history h1{
        display: flex;
        position: absolute;
        background: linear-gradient(180deg, var(--obsidian-key-color-one), var(--obsidian-key-color-one), transparent);
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

    #workspace-container{
        padding-top: 50px;
    }

    #workspace-message{
        width: 300px;
        margin: auto;
        opacity: .6;
        font-size: 1.5em;
        font-weight: 600;
        color: white;
        text-align: center;
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
        transform: rotate(0deg);
        z-index: 1;
    }

    .line-two{
        left: calc(50% - 10px);
        transform: rotate(0deg);
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

    @media screen and (max-width: 800px){
        #logo h2{
            display: none;
        }
    }
</style>
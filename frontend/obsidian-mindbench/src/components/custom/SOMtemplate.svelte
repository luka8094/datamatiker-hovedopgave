<script>
    import {temporaryStorage, archiveStorage, workspaceHistory, authorized} from "../../stores/sysdll"
    //import {Diamonds} from "svelte-loading-spinners"
    import LoadingAnimation from "../Global/LoadingAnimation.svelte"

    let datasheet,
        imageSource

    let displayChart = null

    async function sendFile(){
        if(datasheet[0] !== null){
            displayChart = false
            const form = new FormData()

            form.append("name", datasheet[0].name)
            form.append("file", datasheet[0] )

            const response = await fetch("/api/upload-file:som", {
                method: 'POST',
                credentials: 'include',
                body: form
            })

            const {data, image} = await response.json()

            if(response.status === 202){
                const storedFile = data[2]
                imageSource.src= "data:image/png;base64,"+image

                displayChart = true

                imageSource.style.height = "500px"
                imageSource.style.opacity = "1"

                const file = {
                    filename: storedFile.split(".")[0],
                    filetype: storedFile.split(".")[1],
                    inputs: 0,
                    outputs: 0
                }

                $workspaceHistory.push(file)
                $archiveStorage.push(file)

                $workspaceHistory = $workspaceHistory
                $archiveStorage = $archiveStorage
            }

            if(response.status === 403){
                $authorized = false
            }
        }
        return
    }
</script>

<section>
    <div>
        <h1>1. Upload a datasheet</h1>
        <div class="option">
            <form on:submit|preventDefault={sendFile}>
                <p id="file-size-notice">Note: Current file size limit is <strong>10MB</strong></p>
                <input bind:files={datasheet} type="file" accept=".xlsx,.csv">
                <input type="submit" name="upload" value="upload file"/>
            </form>
        </div>
    </div>

    {#if displayChart === false}
    <div class="loader-container">
        <p>Awaiting response...</p>
        <LoadingAnimation/>
    </div>
    {:else if displayChart}
        <h1>2. Graph ready!</h1>
    {/if}

    <img bind:this={imageSource} src="" alt="SOM graph"/>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        position: absolute;
        background: white;
        height: 100vh;
        width: calc(100% - 150px);
        align-content: center;
        overflow-y: scroll;
        padding: 100px 0;
    }    

    section::-webkit-scrollbar{
        display: flex;
        width: 10px;
        background: #F8F8F8;
    }

    h1{
        color: black;
        font-size: 2em;
        text-align: center;
    }

    section h1:nth-child(3){
        margin: 0 0 10px;
    }
    
    div{
        display: flex;
        flex-direction: column;
        margin: auto;
        height: fit-content;
    }

    .option{
        display: flex;
        flex-direction: column;
        width: 650px;
        height: fit-content;
        background: white;
        margin: 10px 0;
        padding: 20px 60px;
        transition: all 1.5s ease-in-out;   
        border: dashed 1px black;
    }

    .loader-container{
        display: flex;
        height: 100px;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .loader-container p{
        margin-bottom: 20px;
    }

    form{
        display: flex;
        flex-direction: column;
        min-height: 150px;
        max-height: fit-content;
        width: 100%;
        background: white;
        gap: 5px;
        align-items: center;
        justify-content: center;
        transition: all 1.5s ease-in-out;
    }

    #file-size-notice{
        font-size: 10px;
        margin-bottom: 5px;
    }

    input[type="file"]{
        border: solid 1px black;
    }

    input[type="submit"]{
        width: 255px;
        height: 30px;
        background: white;
        border: solid 2px black;
        border-radius: 5px;
        margin: 0 auto;
    }

    p{
        text-align: center;
    }

    img{
        display: flex;
        height: 0px;
        object-fit: contain;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        margin: 10px auto 0;
        border: dashed 3px black;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
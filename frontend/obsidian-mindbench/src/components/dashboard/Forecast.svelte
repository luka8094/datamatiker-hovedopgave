<script>
    import {onMount, afterUpdate} from "svelte"
    import {resizeView, activeFile} from "../../stores/sysdll"

    let datasheet, 
        userInput,
        forecastResponse, 
        answer, 
        answerTwo, 
        answerThree,
        filename

    async function forecast(){
        const response = await fetch("/api/predict", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({input: userInput.value}),
        })

        const {data} = await response.json()
        answer = data
    }

    async function uploadFile(){
        if(datasheet[0] !== null){

            const form = new FormData()
            
            form.append("name", datasheet[0].name)
            form.append("file", datasheet[0])

            const response = await fetch("/api/upload-file:test", {
                method: 'POST',
                credentials: 'include',
                body: form
            })

            const {data} = await response.json()
        }
        return
    }

    $: answer = answer
    $: filename = filename
</script>

<section style="{$resizeView ? "padding-left: 0px;" : "padding-left: 300px"}">
    <h1>Model tester</h1>
    
    {#if $activeFile !== null}
        <p>Forecast values with your trained models here</p>
        <form on:submit|preventDefault={forecast}>
            <fieldset>
                {#each $activeFile as file}
                <div id="active-model-description-header">
                    <h3>Model information:</h3>
                    <p>Current model running: <strong>{file.filename}{file.filetype}</strong></p>
                    <p>Model type: <strong>{file.modelType+"".toUpperCase()}</strong></p>
                </div>
                    <h3>Adjustable input:</h3>
                    {#each file.inputs as input}
                        <div class="input-line">
                            <p>{input}<span>:</span></p><input type="text" name={input} placeholder="input a valid value">
                        </div>
                    {/each}
                    <h3>Expected output:</h3>
                    {#each file.outputs as output}
                        <div class="output-line">
                        <p>output: <span>{output}<span></p>
                        </div>
                    {/each}
                {/each}
                <!--<label for="forecast">Forecast result</label>-->
                <input type="submit" placeholder="submit" value="generate forecast">
                <div bind:this={forecastResponse} id="forecast-response"></div>
            </fieldset>
        </form>
    {/if}
    {#if $activeFile === null}
        <div id="model-required-message">
            <img src="/disclaimer.svg" alt="lacking model notice"/>
            <h1>Model required</h1>
            <p>No model has been applied. Please specify a model before you continue.</p>
            <p>Activate a model to proceed with testing.</p>
        </div>

        <div id="option">
            <form on:submit|preventDefault={uploadFile}>
                <p id="file-size-notice">Note: Current file size limit is <strong>10MB</strong></p>
                <input bind:files={datasheet} type="file" accept=".h5">
                <input type="submit" value="upload file"/>
            </form>
        </div>
    {/if}
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        align-items: center;
        padding-top: 100px;
        padding-left: 300px;
        padding-bottom: 200px;
        transition: all .5s ease-in-out;
        overflow-y: scroll;
    }

    #option{
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

    form{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    fieldset{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 450px;
        height: fit-content;
        padding: 15px 25px;
    }

    input{
        width: 100%;
        height: 30px;
        background: white;
        border: solid 2px black;
        border-radius: 5px;
        margin: 3px autO;
    }

    input[type="submit"]{
        margin: 15px 0;
    }

    input[type="file"]{
        border: solid 1px black;
        border-radius: 0;
        height: 22px;
    }

    #model-required-message{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 650px;
        border: solid 3px black;
        font-size: 1em;
        font-weight: 800;
        justify-content: center;
        align-items: center;
        padding: 10px 0 15px;
        margin-top: 20px;
    }

    #model-required-message h1{
        margin: 10px;
    }

    #model-required-message img{
        object-fit: contain;
        height: 50px;
    }

    #model-required-message p{
        text-align: center;
    }
    
    #file-size-notice{
        font-size: 10px;
        margin-bottom: 5px;
    }

    #active-model-description-header{
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px 0;
    }

    fieldset h3{
        width: 100%;
        margin: 15px 0 5px;
        border-bottom: solid 1px black;
    }

    .output-line,
    .input-line{
        display: flex;
        width: 100%;
        justify-content: space-between;    
    }

    .input-line p{
        display: flex;
        width: auto;
        align-items: center;
    }

    .input-line input{
        padding: 0px 3px;
    }

    .output-line{
        margin: 0px 0px 10px;
    }

    .output-line p{
        display: flex;
        width: 100%;
    }

    .input-line p span{
        display: flex;
        flex-direction: row;
        width: 15px;
        padding: 0 10px;
        margin: auto;
    }

    .output-line p span{
        width: 100%;
        text-align: center;
    }

    #forecast-response{
        display: flex;
        height: 100px;
        width: 100%;
        border: dashed 3px black;
        border-radius: 5px;
        margin: 10px 0;
        text-align: center;
        justify-content: center;
        align-items: center;
        color: grey;
        text-transform: uppercase;
    }
</style>
<script>
    import {temporaryStorage, workspaceHistory, archiveStorage, authorized} from "../../stores/sysdll"
    import LoadingAnimation from "../Global/LoadingAnimation.svelte"
    import {Diamonds} from "svelte-loading-spinners"
    let showOptions = []

    let datasheet,
        storedFilename,
        column,
        rnnOptions

    let inputs = [],
        outputs = 1

    async function sendFile(){
        if(datasheet[0] !== null){
            showOptions[0] = false

            const form = new FormData()
            
            form.append("name", datasheet[0].name)
            form.append("file", datasheet[0])

            const response = await fetch("/api/upload-file:rnn",
            {
                method: 'POST',
                credentials: 'include',
                body: form
            })

            const {data} = await response.json()

            if(response.status === 202){ 
                storedFilename = data.slice(0,2)
                $temporaryStorage = data.slice(2)
                $temporaryStorage = $temporaryStorage

                const file = {
                    filename: storedFilename[1].split(".")[0],
                    filetype: storedFilename[1].split(".")[1]
                }

                $workspaceHistory.push(file)
                $archiveStorage.push(file)

                $workspaceHistory = $workspaceHistory
                $archiveStorage = $archiveStorage

                showOptions[0] = true
            }

            if(response.status === 403){
                $authorized = false
            }
        }
        return
    }

    function confirmColumn(){
        const selectedColumn = column.selectedOptions[0].value

        showOptions[1] = true
    }

    async function confirmConfig(){
        showOptions[2] = false

        Array.from(rnnOptions.children).forEach((item) => {
            if(item.tagName === "INPUT") inputs.push(item.value)
        })
        inputs.pop()
        inputs.push(column.selectedOptions[0].value)
        inputs.push(storedFilename[1].split(/[._]/u)[1])

        const response = await fetch("/api/custom:rnn", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })

        const {data} = await response.json()
        
        if(data.modelComplete && response.status === 202){
            const {modelSettings} = data

            const file = {
                filename: modelSettings[10].split(".")[0],
                filetype: modelSettings[10].split(".")[1],
                inputs: modelSettings[8],
                outputs: 1,
                modelType: "rnn"
            }

            $workspaceHistory.push(file)
            $archiveStorage.push(file)

            $workspaceHistory = $workspaceHistory
            $archiveStorage = $archiveStorage

            showOptions[2] = true
        }

        if(response.status === 403){
            $authorized = false
        }
    }

    $: inputs = inputs
    $: showOptions = showOptions
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

        {#if showOptions[0]}
        <h1>2. Select a column to work with</h1>
        <div class="option">
        <form on:submit|preventDefault={confirmColumn}>
            <div id="column-option">
                <p>value <span>:</span></p>
                <select bind:this={column}>
                    {#if $temporaryStorage.length > 0}
                        {#each $temporaryStorage as option}
                            <option value={option}>
                                {option}
                            </option>
                        {/each}
                    {/if}
                </select>
            </div>
            <input type="submit" value="done!"/>
        </form>
        </div>
        {:else if showOptions[0] === false}
        <div class="loader-container">
            <p>Preparing dataset...</p>
            <LoadingAnimation/>
        </div>
        {/if}

        {#if showOptions[1]}
        <h1>2. Okay! Now, let's define key values</h1>
        <div class="option">
            <form on:submit|preventDefault={confirmConfig}>
                <div bind:this={rnnOptions} id="rnn-model-options">
                    <label for="hidden-layers">How many hidden layers would you like?</label>
                    <input type="number" name="hidden-layers" value="1" min=1 max=10/>
                    <label for="lookBack">How many days should the model look backwards?</label>
                    <input type="number" name="lookBack" value="1" min=1 max=50/>
                    <label for="lookForward">How many days ahead should the model estimate ahead?</label>
                    <input type="number" name="lookForward" value="1" min=1 max=50/>
                    <label for="droprate">How often should the model dropout?</label>
                    <input type="number" name="droprate" value="1" min=1 max=10 inputmode="decimal"/>
                    <label for="neuronsAmount">How many neurons per hidden layer?</label>
                    <input type="number" name="neuronsAmount" value="1" min=1 max=10/>
                    <label for="learningRate">Adjust the learning speed of the model?</label>
                    <input type="number" name="learningRate" value="0.1" min=1 max=10 step="0.1" inputmode="decimal"/>
                    <label for="batchPerRound">Adjust the size of data chunks per training round?</label>
                    <input type="number" name="batchPerRound" value="1" min=1 max=50/>
                    <label for="AmountOfRounds">..and many training rounds do you want on the model?</label>
                    <input type="number" name="amountOfRounds" value="1" min=1 max=1000/>
                    <input type="submit" value="all set!"/>
                </div>
            </form>
        </div>
        {:else if showOptions[1] == false}
        <div class="loader-container">
            <p>Registering configurations...</p>
            <LoadingAnimation/>
        </div>
        {/if}

        {#if showOptions[2]}
        <h1>3. Model ready for export!</h1>
        <div class="option download">
            <a role="button" tabindex="0" href={undefined}>Model ready! get the file</a>
        </div>
        {:else if showOptions[2] == false}
        <div class="loader-container">
            <p>Got it! hold on, building the model...</p>
            <LoadingAnimation/>
        </div>
        {/if}
</section>

<style>
    h1{
        color: black;
        font-size: 2em;
        text-align: center;
    }

    h1:nth-child(n+1){
        margin: 10px 0;
    }

    section{
        display: flex;
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

    section::-webkit-scrollbar-thumb{
        background: rgba(255,255,255,.6);
    }

    div{
        display: flex;
        flex-direction: column;
        margin: auto;
        height: fit-content;
    }

    #column-option{
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    #column-option p{
        width: 100px;
    }

    #column-option select{
        width: 100%;
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

    .option.download{
        border: none;
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

    label{
        margin: 10px auto 5px 0;
    }

    form:hover{
        border: dashed 2p black;
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
        margin: 10px auto;
    }

    input[name="upload"]{
        margin-top: 0;
    }

    input[type="number"]{
        display: flex;
        height: 30px;
        margin: auto;
    }

    input[type="number"]{
        width: 100%;
        margin-bottom: 10px;
    }
    
    a{
        display: flex;
        height: 100px;
        width: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    a:hover{
        border: dashed 3px black;
        border-radius: 5px;
    }
</style>
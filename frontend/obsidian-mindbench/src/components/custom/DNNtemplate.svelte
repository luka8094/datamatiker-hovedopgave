<script>
    import {temporaryStorage, workspaceHistory, archiveStorage, authorized} from "../../stores/sysdll"
    //import {Diamonds} from "svelte-loading-spinners"
    import LoadingAnimation from "../Global/LoadingAnimation.svelte"

    let showOptions = [], 
        totalColumns = [], 
        inputValues = [], 
        outputValue = []

    let datasheet, 
        storedFilename, 
        inputsContainer,
        hiddenLayers

    let inputs = 1,
        outputs = 1
   
    async function sendFile(){
        if(datasheet[0] !== null){
                showOptions[0] = false

            const form = new FormData()
            
            form.append("name", datasheet[0].name)
            form.append("file", datasheet[0])

            const response = await fetch("/api/upload-file:dnn", {
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
        }
        return
    }

    function confirmInputs(){
        inputValues = []
        const inputsArray = [...inputsContainer.children]

        for(let i = 0; i < inputsArray.length; i++){
            if((i + 1) % 2 == 0) inputValues.push(inputsArray[i].value)
        }

        showOptions[1] = true
    }

    function confirmOutput(e){
        outputValue = []
        outputValue.push(e.target.children[0].children[1].value)

        showOptions[2] = true

        totalColumns = [...new Set(inputValues.concat(outputValue))]
    }

    async function sendConfig(){   
        showOptions[3] = false
        
        const modelConfig = [totalColumns, inputValues, outputValue, hiddenLayers.value, storedFilename[1]]

        const response = await fetch("/api/custom:dnn", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(modelConfig)
        })

        const {data} = await response.json()

        if(data.modelComplete && response.status === 202){ 
            showOptions[3] = true

            const {modelSettings} = data
            const file = {
                filename: modelSettings[5].split(".")[0], 
                filetype: modelSettings[5].split(".")[1],
                inputs: inputValues,
                outputs: outputValue,
                modelType: "dnn"
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

    async function getModelFile(){
        const response = await fetch("/api/save-file", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({filename: storedFilename})
        })

        const {data} = await response.json()
    }

    $: inputs = inputs
    $: showOptions = showOptions
</script>

<section>
    <div>
        <h1>1. Upload datasheet</h1>
        <div class="option">
            <form on:submit|preventDefault={sendFile}>
                <p id="file-size-notice">Note: Current file size limit is <strong>10MB</strong></p>
                <input bind:files={datasheet} type="file" accept=".csv, .xlsx">
                <input type="submit" value="upload file"/>
            </form>
        </div>
        {#if showOptions[0]}
        <h1>2. Select amount of inputs</h1>
        <div class="option">
            <form on:submit|preventDefault={confirmInputs}>
                <input type="number" bind:value={inputs} min=0 max={$temporaryStorage.length}>
                <label for="columns-select">Amount of choosable columns:</label>
                <input type="range" name="columns-select" bind:value={inputs} min=0 max={$temporaryStorage.length}>
                <p id="input-range"><span>0</span> <span>{$temporaryStorage.length}</span></p>
                {#if $temporaryStorage.length > 0}
                    <div bind:this={inputsContainer} id="inputs-select-container">
                        {#each Array(inputs) as _, i}
                            <p>value {i + 1} <span>:</span></p>
                            <select>
                                {#if $temporaryStorage.length > 0}
                                    {#each $temporaryStorage as option}
                                        <option value={option}>
                                            {option}
                                        </option>
                                    {/each}
                                {/if}
                            </select>
                        {/each}
                    </div>
                {/if}
                <input type="submit" value="done!"/>
            </form>
        </div>
        {:else if showOptions[0] === false}
        <div class="loader-container">
            <p>Extracting columns in dataset</p>
            <LoadingAnimation/>
        </div>
        {/if}

        {#if showOptions[1]}
        <h1>3. Great. Now specify an output.</h1>
        <div class="option">
            <form on:submit|preventDefault={confirmOutput}>
                {#if $temporaryStorage.length > 0}
                    <div id="inputs-select-container">
                        {#if $temporaryStorage.length > 0}
                            <p>output <span>:</span></p>
                            <select>
                            {#each $temporaryStorage as option}
                                <option value={option}>
                                    {option}
                                </option>
                            {/each}
                            </select>
                        {/if}
                    </div>
                {/if}
                <input type="submit" value="done!"/>
            </form>
        </div>
        {:else if showOptions[1] === false}
        <div class="loader-container">
            <LoadingAnimation/>
        </div>
        {/if}

        {#if showOptions[2]}
        <h1>4. Nice! let's set up the neural network.</h1>
        <div class="option">
            <form on:submit|preventDefault={sendConfig}>
                <div id="hidden-layers-options">
                    <label for="hidden-layers">How many hidden layers would you like?</label>
                    <input bind:this={hiddenLayers} type="number" name="hidden-layers" value="1" min=1 max=10/>
                    <input type="submit" value="all set!"/>
                </div>
            </form>
        </div>
        {:else if showOptions[2] === false}
        <div class="loader-container">
            <LoadingAnimation/>
        </div>
        {/if}

        {#if showOptions[3]}
        <h1>5. Done! Model ready to download.</h1>
        <div class="option download">
            <a role="button" tabindex="0" on:click={getModelFile} href={undefined}>Model ready! get the file</a>
        </div>
        {:else if showOptions[3] === false}
        <div class="loader-container">
            <p>Please wait... building the model</p>
            <LoadingAnimation/>
        </div>
        {/if}
    </div>
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

    label[for="columns-select"]{
        margin: 10px auto 0 0;
    }

    form:hover{
        border: dashed 2p black;
    }

    input[type="file"]{
        border: solid 1px black;
    }

    input[type="text"]{
        width: 255px;
        margin: 2px;
        padding: 5px;
    }

    input[type="submit"]{
        width: 255px;
        height: 30px;
        background: white;
        border: solid 2px black;
        border-radius: 5px;
    }

    input[type="number"],
    input[type="range"]{
        display: flex;
        height: 30px;
        margin: auto;
    }
    input[type="number"]{
        width: 255px;
    }

    input[type="range"]{
        width: 100%;
    }

    #input-range{
        display: flex;
        width: 100%;
        margin: auto;
        justify-content: space-between;
    }

    #inputs-select-container{
        display: grid;
        height: fit-content;
        grid-template-columns: 80px auto;
        gap: 5px;
        margin: 20px 0;
    }

    #inputs-select-container p span{
        margin-left: auto;
    }

    #hidden-layers-options{
        display: flex;
        flex-direction: column;
        height: fit-content;
    }

    #hidden-layers-options input[type="submit"]{
        margin: 10px auto 20px;
    }

    button{
        width: 255px;
        height: 30px;
        background: white;
        border: solid 2px black;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
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
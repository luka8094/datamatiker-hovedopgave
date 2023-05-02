<script>
    let showOptions = [false, false, false]
    let datasheet, inputs, outputs

    async function sendFile(){
        console.log(datasheet[0])
        const form = new FormData()
        
        form.append("name", datasheet[0].name)
        form.append("file", datasheet[0])
        console.log(form)

        const response = await fetch("/upload-file", {
        method: 'POST',
        body: form
        })

        const {data} = await response.json()
        console.log(data)

        if(data){
            showOptions[0] = true
        }
    }

    function sendConfig(){
        console.log("sending model config")
    }

    function getModelFile(){
        console.log("downloading model")
    }
</script>

<section>
    <div>
        <h1>1. Upload datasheet</h1>
        <form on:submit|preventDefault={sendFile}>
            <input bind:files={datasheet} type="file" accept=".csv, .xlsx">
            <input type="submit" value="upload file"/>
        </form>
        {#if showOptions[0]}
            <div class="option">
                <h1>2. Choose input</h1>
                <form>
                    <input bind:this={inputs} type="text" placeholder="input columns of interest"/>
                    <button on:click|preventDefault={() => showOptions[1] = true}>done!</button>
                </form>
            </div>
        {/if}
        {#if showOptions[1]}
            <div class="option">
                <h1>3. Choose output</h1>
                <form>
                    <input bind:this={outputs} type="text" placeholder="output column of interest"/>
                    <button on:click|preventDefault={() => showOptions[2] = true}>done!</button>
                </form>
            </div>
        {/if}
        {#if showOptions[2]}
            <div class="option">
                <h1>4. Download!</h1>
                <a role="button" tabindex="0" on:click={getModelFile}>Model ready! get the file</a>
            </div>
        {/if}
    </div>
</section>

<style>
    h1{
        color: black;
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
        background: rgba(255,255,255,.5);
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
        width: 100%;
        height: fit-content;
        padding: 0;
        transition: all 3s ease-in;
    }

    form{
        display: flex;
        flex-direction: column;
        height: 150px;
        width: 100%;
        background: lightgrey;
        gap: 5px;
        align-items: center;
        justify-content: center;
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
    }

    a:hover{
        border: dashed 3px black;
        border-radius: 5px;
    }
</style>
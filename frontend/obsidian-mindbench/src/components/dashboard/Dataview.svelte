<script>
    import {resizeView} from "../../stores/sysdll"
    import LoadingAnimation from "../Global/LoadingAnimation.svelte"
    //import {Diamonds} from "svelte-loading-spinners"

    let uploaded,
        datasheet,
        editMode = "columns"

    let datasheetRows = [],
        datasheetColumns = [],
        newDatasheet = []

    async function uploadSheet(){
        if(datasheet[0] !== null){
            uploaded = false

            const form = new FormData()
            
            form.append("name", datasheet[0].name)
            form.append("file", datasheet[0])

            const response = await fetch("/api/upload-sheet", {
                method: 'POST',
                credentials: 'include',
                body: form
            })

            const {data} = await response.json()

            if(response.status === 202){
                const {columns, rows} = data
                datasheetColumns = columns
                datasheetRows = rows.slice(0,500)
                uploaded = true
            }
        }
        return
    }

    function toggleEditMode(event){
        const {id} = event.target

        if(id === "columns-button") editMode = "columns"
        if(id === "rows-button") editMode = "rows"
    }

    function getColumn(event){
        const {columnNumber, id} = event.target.dataset

        newDatasheet.push(id)
        
        datasheetColumns.splice(datasheetColumns.indexOf(id), 1)
        datasheetColumns = datasheetColumns
    }

    $: newDatasheet = newDatasheet
    $: datasheetColumns = datasheetColumns
    $: datasheetRows = datasheetRows
</script>

<section style="{ $resizeView ? "margin-left: 0px;" : "margin-left: 250px;"} { uploaded ? "flex-direction: row;" : "flex-direction: column;"}">
    {#if uploaded === undefined}
    <h1>Dataview</h1>
    <p>Upload a XLSX datasheet to get a preview or edit what you're working with</p>
    <div id="option">
        <form on:submit|preventDefault={uploadSheet}>
            <p id="file-size-notice">Note: Current file size limit is <strong>10MB</strong></p>
            <input bind:files={datasheet} type="file" accept=".xlsx">
            <input type="submit" value="upload file"/>
        </form>
    </div>
    {:else if uploaded === false}
    <div class="loader-container">
        <p>Hang on. Collecting XLSX data...</p>
        <LoadingAnimation/>
    </div>
    {:else}
        <div id="table-view">
        <table on:click|stopPropagation|preventDefault={getColumn} on:keypress={undefined}>
            <thead>
                <tr id="datasheet-headers">
                    {#each datasheetColumns as column, i}
                        <button data-column-number={i} data-id={column} title="remove {column} column values">{column}</button>
                    {/each} 
                </tr>
            </thead>
            <tbody>
                {#each datasheetRows as row, index_a}
                {@const keys = Object.values(datasheetColumns)}
                    <tr data-row-number={index_a}>
                        {#each keys as key, index_b}
                            <td data-column-number={index_b}>{row[key]}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
        </div>
        <div id="edit-mode" on:click|preventDefault|stopPropagation={toggleEditMode} on:keypress={undefined}>
            <h3>Selection mode</h3>
            <button id="columns-button">Columns</button>
            <button id="rows-button">Rows</button>
        </div>
    {/if}
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-left: 300px;
        transition: all .5s ease-in-out;
        overflow-x: scroll;
    }

    section::-webkit-scrollbar{
        display: flex;
        width: 0px;
        height: 0px;
        background: white;
    }

    #datasheet-headers,
    tr{
        display: flex;
        height: 50px;
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

    input{
        width: 255px;
        height: 30px;
        background: white;
        border: solid 2px black;
        border-radius: 5px;
        margin: 0 auto;
    }

    input[type="file"]{
        border: solid 1px black;
        border-radius: 0;
        height: 22px;
    }

    .loader-container{
        display: flex;
        flex-direction: column;
        height: 100px;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .loader-container p{
        margin-bottom: 20px;
    }

    #table-view{
        display: flex;
        height: calc(90vh - 70px);
        width: calc(100% - 380px);
        overflow-y: scroll;
        overflow-x: scroll;
        margin: auto 20px auto auto;
        border: none;
    }
 
    #table-view::-webkit-scrollbar{
        display: flex;
        height: 15px;
        background: #F8F8F8;
    }

    #table-view::-webkit-scrollbar-thumb{
        display: flex;
        background: rgba(255,255,255,.6);
        border-radius: 5px;
    }

    table{
        display: flex;
        flex-direction: column;
        min-width: 100%;
        max-width: fit-content;
        background: white;
        transition: all .5s ease-in-out;
        border-collapse: collapse;
    }

    table > *{
        border: solid 1px dimgrey;
    }

    thead{
        background: grey;
        height: 50px;
        width: 100%;
    }

    td{
        display: flex;
        min-width: 100px;
        border: solid 1px black;
        padding: 0;
        margin: 0;
        flex: 1 1 0;
        justify-content: center;
        align-items: center;
    }

    tr button{
        min-width: 100px;
        height: inherit;
        background: var(--obsidian-key-color-one);
        color: white;
        border: 0;
        border-radius: 0;
        transition: background 1s ease-in-out;
        flex: 1 1 0;
        outline-offset: -1px;
        font-size: clamp(.9rem, 2.5vw, .3rem);
    }

    tr button:focus{
        outline: none;
    }

    button:hover{
        background: lightgrey;
        outline: solid 1px black;
        color: black;
    }

    #edit-mode{
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0 20px;
        width: 190px;
        height: 200px;
        border: dashed 1px black;
        justify-content: space-evenly;
        margin: 40px 50px auto 0;
    }

    /*
    #convert-file-button{
        display: flex;
        height: fit-content;
        width: fit-content;
        padding: 0;
        outline: solid;
        border-radius: 0;
        margin-bottom: 20px;
    }

    #convert-file-button img{
        display: flex;
        height: 50px;
        width: 50px;
        object-fit: contain;
    }*/
</style>
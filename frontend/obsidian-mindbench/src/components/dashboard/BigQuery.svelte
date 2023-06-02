<script>
    import {afterUpdate} from "svelte"
    import {bigQuery, resizeView} from "../../stores/sysdll"

    let queryInput,
        queryResult

    async function sendQuery(){
        const response = await fetch("/api/bigquery/new", {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bigQuery: queryInput.value})
        })

        const {data} = await response.json()

        if(response.status === 202){
            queryResult.value = data

            queryResult = queryResult
        }
    }

    function clearPrompt(){
        queryInput.value = ""
    }
</script>

{#if $bigQuery}
    <section style="{$resizeView ? "margin-left: 0px;" : "margin-left: 300px;"}">
        <h1>BigQuery integration</h1>
        <div id="bigquery-prompt-container">
            <div bind:this={queryResult} id="bigquery-table-view" title="BigQuery table result if any">
            </div>
            <div id="bigquery-user-input-panel" title="Write a SQL query in this text field">
                <textarea bind:this={queryInput} id="bigquery-user-input" on:click={sendQuery} cols="80" rows="20" wrap="virtual" placeholder="Awaiting SQL query..."></textarea>
                <div id="bigquery-user-options">
                    <button id="query-button" on:click={() => sendQuery}>Confirm query</button>
                    <button id="download-button" on:click={clearPrompt}>Clear Prompt</button>
                    <button id="download-button">Download Table</button>
                </div>
            </div>
        </div>
    </section>
{/if}
<style>
    section{
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: fit-content;
        align-items: center;
        justify-content: space-between;
        transition: all 1s ease-in-out;
    }

    h1{
        margin: 10px auto 20px 80px;
        text-align: center;
    }

    #bigquery-prompt-container{
        display: flex;
        flex-direction: column;
        height: 550px;
        width: calc(100% - 200px);
        background: white;
        transition: all .5s ease-in-out;
    }

    #bigquery-table-view,
    #bigquery-user-input{
        display: flex;
        width: inherit;
    }
    
    #bigquery-table-view{
        height: 350px;
        width: 100%;
        background: #D8D8D8;
        border: solid 1px black;
    }
    
    #bigquery-user-input{
        border: solid 1px black;
    }

    #bigquery-user-input-panel{
        display: flex;
        height: fit-content;
    }

    #bigquery-user-input{
        height: 200px;
        width: calc(100% - 20px);
        resize: none;
        background: white;
        margin: 10px;
        padding: 3px;
    }

    #bigquery-user-options{
        display: flex;
        flex-direction: column;
        width: fit-content;
        height: fit-content;
    }

    button{
        height: 45px;
        background: white;
        margin: 10px 10px 0 0;
        border: solid 2px black;
        border-radius: 5px;
        text-align: center;
        font-size: 10px;
        font-weight: 400;
    }
</style>
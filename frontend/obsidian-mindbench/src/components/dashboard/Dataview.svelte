<script>
    import {resizeView} from "../../stores/sysdll"
    let uploaded = false

    const testArray = ["a","b","c","d","e","f","g","h","i","j", "a","b","c","d","e","f","g","h","i","j"]

    async function uploadSheet(){
        uploaded = true
    }
</script>

<section style="{ $resizeView ? "margin-left: 0px;" : "margin-left: 300px;"}">
    {#if !uploaded}
    <h1>Dataview</h1>
    <p>Upload a datasheet to get a preview of what you're working with</p>
    <form on:submit={uploadSheet}>
        <fieldset>
            <input type="submit" value="send">
        </fieldset>
    </form>
    {:else}
        <div id="table-view">
        <table>
            <thead>
                <tr>
                    {#each testArray as item, i}

                        <td>{i < 1 ? "" : item}</td>
                    {/each} 
                </tr>
            </thead>
            <tbody>
                {#each Array(testArray.length) as _, i}
                    <tr>
                        {#each testArray as element, i}
                           <td>{i == 0 ? element : i}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
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

    #table-view{
        display: flex;
        height: calc(90vh - 70px);
        width: calc(100% - 300px);
        overflow-y: scroll;
        overflow-x: scroll;
        margin: auto;
        border: none;
    }

    
    #table-view::-webkit-scrollbar{
        display: flex;
        height: 15px;
        background: rgba(0, 0, 0, .2);
    }

    #table-view::-webkit-scrollbar-thumb{
        display: flex;
        background: rgba(255,255,255,.5);
        border-radius: 5px;
    }

    table{
        display: flex;
        flex-direction: column;
        width: fit-content;
        background: white;
        transition: all .5s ease-in-out;
        border-collapse: collapse;
    }

    table > *{
        border: solid 1px dimgrey;
    }

    thead{
        background: lightgrey;
    }

    td{
        border: solid 1px black;
        min-width: 100px;
        min-height: 70px;
        padding: 0;
        margin: 0;
    }
</style>
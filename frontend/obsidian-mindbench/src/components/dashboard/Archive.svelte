<script>
    import ArchiveFileElement from "./Archive/ArchiveFileElement.svelte"

    const userFiles = ["filename1", "filename2", "model", "model2","model3", "anotherFile", "MyRNN"]
</script>

<section>
    <!--Archive page for saved files-->
    <div id="files-overview">
        {#each userFiles as fn, i}
            <ArchiveFileElement 
                fileName={fn} 
                tabNumber={i}
            />
        {/each}
    </div>
</section>

<style>
    section{
        display: flex;
        width: calc(100% - 300px);
        flex-direction: column;
        overflow: hidden;
        background: rgba(10, 110, 210, .5);
    }

    div{
        display: grid;
        min-height: 200px;
        height: fit-content;
        grid-template-columns: repeat(5, 200px);
        gap: 10px;
        width: fit-content;
        background: rgba(0,0,0,.1);
        margin: 10px auto 0;
    }
</style>
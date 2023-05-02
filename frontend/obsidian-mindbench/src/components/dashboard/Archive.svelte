<script>
    import {resizeView} from "../../stores/sysdriver";
    import ArchiveFileElement from "./Archive/ArchiveFileElement.svelte"

    const userFiles = ["filename1", "filename2", "model", "model2","model3", "anotherFile", "MyRNN","filename1", "filename2", "model", "model2","model3", "anotherFile", "MyRNN"]
</script>

<section style="{ $resizeView ? "padding-left: 0px;" : "padding-left: 300px"}">
    <h1>File storage</h1>
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
        position: absolute;
        min-height: calc(100% - 70px);
        max-height: fit-content;
        width: 100%;
        flex-direction: column;
        overflow: hidden;
        background: rgba(10, 110, 210, 0);
        padding-left: 300px;
        overflow-y: scroll;
        transition: padding 1s ease-in-out;
        z-index: 0;
    }

    section::-webkit-scrollbar{
        display: flex;
        width: 10px;
        background: rgba(255,255,255,.5);
    }

    h1{
        margin: 10px 0 10px 80px;
    }

    div{
        display: grid;
        min-height: 200px;
        height: fit-content;
        grid-template-columns: repeat(5, 200px);
        gap: 10px;
        width: fit-content;
        background: rgba(0,0,0,0);
        margin: 10px auto 0;
    }
</style>
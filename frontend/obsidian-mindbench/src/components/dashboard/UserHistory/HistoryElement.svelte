<script>
    export let fileName

    function openFile(){
        console.log("test")
    }
</script>

<div>
    <button data-fileName={fileName} on:click={openFile}>{fileName}.h5</button>
</div>

<style>
    div{
        display: flex;
        height: 80px;
        width: inherit;
        background: rgba(100,100,150,.5);
        border-radius: 10px;
        margin: 5px 0;
    }
    button{
        display: flex;
        height: 70px;
        width: calc(295px - 25px);
        background: rgba(150,100,250,.9);
        margin: auto 10px auto 5px;
    }
</style>
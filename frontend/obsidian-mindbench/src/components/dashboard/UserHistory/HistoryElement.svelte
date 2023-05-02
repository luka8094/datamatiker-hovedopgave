<script>
    export let fileName

    function fileAction(e){
        const target = e.currentTarget.id;
        if(target === "remove-button"){ 
            return console.log("clicked remove")
        }
        else console.log("clicked open")
    }
</script>

<div>
    <button data-fileName={fileName} on:click|preventDefault={fileAction}>
        <button id="remove-button" on:click|preventDefault={fileAction}>
            <div class="line line-one"></div>
            <div class="line line-two"></div>
        </button>
        <p>{fileName}.h5<p>
    </button>
</div>

<style>
    div{
        display: flex;
        height: 80px;
        width: inherit;
        background: transparent;
        border-radius: 10px;
        margin: 5px 0;
        opacity: 1;
    }
    button{
        display: flex;
        flex-direction: column;
        height: 70px;
        width: calc(295px - 25px);
        background: white;
        margin: auto 10px auto 5px;
    }

    #remove-button{
        height: 25px;
        width: 25px;
        position: relative;
        background: rgba(0, 0, 0, .2);
        padding: 0;
        border-radius: 20px;
        margin-left: auto;
    }

    #remove-button .line{
        display: flex;
        position: absolute;
        width: 15px;
        height: 2px;
        background: black;
        top: 3.9px;
        left: 3.9px;
    }

    .line-one{
        transform: rotate(45deg);
    }

    .line-two{
        transform: rotate(-45deg);
    }
</style>
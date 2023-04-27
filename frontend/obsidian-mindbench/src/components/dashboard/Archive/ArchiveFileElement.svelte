<script>
    export let fileName, tabNumber
    let downloadButton

    async function getFile(){
        const response = await fetch("/api/download", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({file: fileName})
        })

        const download = await response.blob()
        const file = new Blob([download],{type: "applicaiton/octet-stream"})
        const url = window.URL.createObjectURL(file)

        downloadButton.href = url
        downloadButton.download = fileName+".h5"            

        downloadButton.removeEventListener('click', getFile)
    }   
</script>

<a tabindex="{tabNumber}" bind:this={downloadButton} role="button" data-file={fileName} on:click={getFile}>
    <div id="file-icon">
        <div id="file-part-three">
            <div id="file-part-four">

            </div>
        </div>
        <div id="file-part-one">
            <div id="file-part-two">
            </div>
        </div>    
    </div>
    <p>{fileName}.h5</p>
</a>

<style>
    a{
        display: flex;
        flex-direction: column;
        height: 200px;
        width: 200px;
        background: transparent;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: black;
    }

    #file-icon{
        display: flex;
        height: 150px;
        width: 150px;
        background: lightgray;
        clip-path: polygon(100% 100%, 100% 25%, 75% 0%, 0% 0%, 0% 100%);
        position: relative;
        border: solid 1px black;
    }

    #file-part-one,
    #file-part-two{
        display: flex;
    }

    #file-part-one{
        position: relative;
        height: 35px;
        width: 85px;
        background: royalblue;
        top: -1px;
        left: 25px;
        border: solid 2px black;
        overflow: hidden;
    }

    #file-part-two{
        height: 35px;
        width: 5px;
        background: black;
        position: relative;
        left: 75%;
    }

    #file-part-three{
        display: flex;
        height: 75px;
        width: 75px;
        background: black;
        position: absolute;
        z-index: 10;
        top: 30%;
        left: 25%;
        border-radius: 100px;
    }

    #file-part-four{
        display: flex;
        width: 20px;
        height: 20px;
        background: lightgrey;
        position: absolute;
        top: 35%;
        left: 35%;
        border-radius: 100px;
    }

    a:hover{
        border: dashed 2px black;
        border-radius: 5px;
    }
</style>
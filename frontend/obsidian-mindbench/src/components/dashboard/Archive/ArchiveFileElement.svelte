<script>
    export let fileName, tabNumber, filetype
    let downloadButton

    async function getFile(event){
        const filename = event.currentTarget.dataset.file

        const response = await fetch("/api/download:archive", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({file: `${filename}.${filetype}`})
        })

        let blobType

        if(filetype === "csv") blobType = "text/csv"
        else blobType = "application/x-hdf5"

        if(response.status === 200){
            const download = await response.blob()
            const file = new Blob([download],{type: blobType})
            const url = window.URL.createObjectURL(file)

            downloadButton.href = url
            downloadButton.download = `${fileName}.${filetype}`
        }
        else return
    }   
</script>

<a tabindex="{tabNumber}" bind:this={downloadButton} role="button" data-file={fileName} on:click={getFile} href={undefined}>
    <div id="file-icon">
        <div class="file-part-five">

        </div>
        <div id="file-part-three">
            <div id="file-part-four">

            </div>
        </div>
        <div id="file-part-one">
            <div id="file-part-two">
            </div>
        </div>    
        <div class="file-part-six">

        </div>
        <div id="file-part-seven">

        </div>
    </div>
    <p>{fileName}.{filetype}</p>
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
        background: grey;
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
        background: linear-gradient(45deg, grey, lightblue);
        top: -1px;
        left: 25px;
        border: solid 2px gray;
        overflow: hidden;
    }

    #file-part-two{
        height: 29px;
        width: 18px;
        background: dimgrey;
        position: relative;
        left: 57%;
        border-bottom: solid 1px black;
        border-left: solid 1px black;
    }

    #file-part-three{
        display: flex;
        height: 25px;
        width: 25px;
        background: black;
        position: absolute;
        z-index: 10;
        top: 60px;
        left: 60px;
        border-radius: 100px;
    }

    #file-part-four{
        display: flex;
        width: 20px;
        height: 20px;
        background: lightgrey;
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 100px;
    }

    .file-part-five,
    .file-part-six{
        display: flex;
        position: absolute;
        height: 100%;
        width: 15px;
        background:linear-gradient(45deg, grey, lightgrey);
    }

    .file-part-six{
        right: 0;
    }

    #file-part-seven{
        display: flex;
        position: absolute;
        height: 55px;
        width: 99px;
        background: repeating-linear-gradient(0deg, white 0%, white 9%, blue 10%, blue 11%, white 21%, white 22%);
        bottom: 0;
        left: 25px;
        border-radius: 5px 5px 0 0;
    }

    a:hover{
        border: dashed 3px black;
        border-radius: 5px;
    }
</style>
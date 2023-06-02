<script>
    import {createEventDispatcher} from "svelte"
    import {fade} from "svelte/transition"
    import {workspaceHistory, activeFile} from "../../../stores/sysdll"

    export let fileName, filetype
    let downloadButton, type

    const dispatch = createEventDispatcher()

    async function fileAction(e){
        const target = e.currentTarget.id
        const filename = `${fileName}.${filetype}`

        if(target === 'remove'){ 
            const response = await fetch("/api/delete-file:history",{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({file: filename})
            })

            const {data} = await response.json()

            if(response.status === 202){
                dispatch('removeHistoryElement', {value: fileName})
            }
        }

        if(target === 'apply'){ 
            $activeFile = $workspaceHistory.filter(item => item.filename === fileName)
            
            $activeFile = $activeFile
        }

        if(target === 'download'){ 
            const response = await fetch("/api/download:history",{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({file: filename})
            })

            if(filetype === "csv") type = "text/csv"
            else type = "application/x-hdf5"

            const download = await response.blob()
            const downloadFile = new Blob([download],{type: type})
            const url = window.URL.createObjectURL(downloadFile)

            downloadButton.href = url
            downloadButton.download = filename
        }
    }
</script>

<div>
    <div id="history-file-container" data-fileName={fileName} in:fade={{duration: 1000}} out:fade>
        <p>{fileName}.{filetype}</p>
        <div id="history-file-options">
            <button id="remove" on:click|preventDefault={fileAction}>
                <img src="/remove_file.svg" alt="remove file" title="remove file"/>
            </button>
            <button id="apply" on:click|preventDefault={fileAction}>
                <img src="/apply_file.svg" alt="apply file" title="apply file"/>
            </button>
            <a id="download" bind:this={downloadButton} on:click={fileAction} href={undefined}>
                <img src="/download_file.svg" alt="download file" title="download file"/>
            </a>
        </div>
    </div>
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

    #history-file-container{
        display: flex;
        flex-direction: column;
        height: 70px;
        width: calc(295px - 25px);
        background: white;
        margin: auto 10px auto 5px;
        padding: 5px 20px;
    }

    #history-file-container p{
        border-bottom: solid 1px black;
    }

    /*
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
    */

    #history-file-options{
        justify-content: space-between;
        height: inherit;
        width: 130px;
        align-items: center;
        border-radius: 0;
        margin-left: auto;
    }

    #history-file-options button,
    #history-file-options a{
        display: flex;
        background: transparent;
        align-items: center;
        justify-content: center;
        border-radius: 0;
        gap: 5px;
        transition: all .5s ease-in-out;
    }

    #history-file-options button{
        height: 25px;
        width: 20px;
    }

    #history-file-options button:hover,
    #history-file-options a:hover{
        border: solid 1px black;
        background: #D8D8D8;
    }
    
    #history-file-options button img,
    #history-file-options a img{
        object-fit: contain;
        height: inherit;
        padding: 3px;
    }

    #history-file-options a{
        display: flex;
        height: 25px;
        width: 45px;
    }

    a:hover{
        cursor: pointer;
    }
</style>
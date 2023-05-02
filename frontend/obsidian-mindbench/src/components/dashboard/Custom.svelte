<script>
    import {resizeView} from "../../stores/sysdriver"

    import DNNtemplate from "../Custom/DNNtemplate.svelte"
    import RNNtemplate from "../Custom/RNNtemplate.svelte"
    let dnnOptionSlide, rnnOptionSlide, dnnDescription, rnnDescription

    function selectTemplate(e){
        const option = e.currentTarget.dataset.option
        console.log(option)

        if(option === 'rnn'){
            const position = rnnOptionSlide.style.left

            if( position != "0px") rnnOptionSlide.style.left = "0px"
            else rnnOptionSlide.style.left = $resizeView ? "-1350px" : "-1100px"
        }

        if(option === 'dnn'){
            const position = dnnOptionSlide.style.left

            if(position != "0px"){ 
                rnnOptionSlide.style.left = "-1400px"
                dnnOptionSlide.style.left = "0px"
            }
            else{
                rnnOptionSlide.style.left = $resizeView ? "-1350px" : "-1100px"
                dnnOptionSlide.style.left = $resizeView ? "-1250px" : "-990px"
            }
        }

        /*
        else rnnOptionSlide.style.left = "-250px"
        if(option === 'dnn' && dnnOptionSlide.style.left == "-300px") dnnOptionSlide.style.left = "700px"
        else dnnOptionSlide.style.left = "-300px"*/
    }

    function showDescription(e){
        console.log(e.currentTarget.id)
        const target = e.currentTarget.id

        if(target === "dnn-option"){
            dnnDescription.style.opacity = "1"
        } 
        if(target === "rnn-option"){
            rnnDescription.style.opacity = "1"
        }
    }

    function hideDescription(){
        dnnDescription.style.opacity = "0"
        rnnDescription.style.opacity = "0"
    }
</script>

<div id="custom" style="{ $resizeView ? "margin-left: 0px;" : "margin-left: 300px;"}">
    <div bind:this={dnnOptionSlide} id="dnn-option" style="{ $resizeView ? "left: -1250px;" : "left: -990px;"}" 
    on:mouseenter={showDescription}
    on:mouseleave={hideDescription}>
        <DNNtemplate/>
        <button data-option="dnn" on:click|preventDefault={selectTemplate}>
            <span>
                DNN
            </span>
        </button>
    </div>
    <div bind:this={rnnOptionSlide} id="rnn-option" style="{ $resizeView ? "left: -1350px;" : "left: -1100px;"}" 
    on:mouseenter={showDescription}
    on:mouseleave={hideDescription}>
        <RNNtemplate/>
        <button data-option="rnn" on:click|preventDefault={selectTemplate}>
            <span>
                RNN
            </span>
        </button>
    </div>
    <h1>Custom models section</h1>
    <p>Select a work template</p>
    <article id="description">
        <div bind:this={dnnDescription} id="dnn-description">
            <h1>Deep neural network</h1> 
            <p>Basic neural network in Machine Learning.</p>
        </div>
        <div bind:this={rnnDescription} id="rnn-description">
            <h1>Recurrent neural network</h1> 
            <p>Advanced neural network in Machine Learning.</p>
            <p>Enchanced version with Long Short Term Memory.</p>
            <p>Beneficial for time series forecasting.</p>
        </div>
    </article>
</div>

<style>
    div#custom{
        display: flex;
        position: relative;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
        background: white;
        overflow: hidden;
        margin-left: 0 ;
        z-index: 0;
    }

    h1{
        margin-top: auto;
        position: relative;
        z-index: -10;
    }

    p{
        position: relative;
        margin-bottom: auto;
        z-index: -10;
    }

    #dnn-option, #rnn-option{
        position: relative;
        transition: all .5s ease-in-out;
    }

    button{
        outline: none;
        border: white;
    }

    div > button{
        writing-mode: vertical-lr;
        border-right: solid 1px black;
        position: absolute;
        right: 0;
        height: 100%;
        padding: 45px 0 0 0;
        font-size: 3rem;
        background: transparent;
        background: linear-gradient(-90deg, #F8F8F8, white, white);
    }

    button span{
        display: inline-block;
        transform: rotate(90deg);
        position: relative;
        top: -250px;
    }

    #rnn-option{
        display: flex;
        flex-direction: column;
        position: absolute;
        height: 100vh;
        width: 100%;
        background: white;
        z-index: -1;
        left: -1100px;
    }

    #dnn-option{
        display: flex;
        position: absolute;
        height: 100vh;
        width: 100%;
        background: white;
        z-index: -2;
        left: -990px;
    }

    #description{
        margin-right: 10px;
    }

    #dnn-description,
    #rnn-description{
        display: flex;
        flex-direction: column;
        position: absolute;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        text-align: right;
        color: black;
    }

    #dnn-description > h1,
    #rnn-description > h1{
        margin-bottom: 10px;
    }

    #dnn-description{
        z-index: 1;
    }

    #dnn-description{
        z-index: 2;
    }

    article{
        position: relative;
        height: 200px;
        width: 200px;
        position: absolute;
        right: 10px;
        height: 500px;
        width: 350px;
        opacity: .5;
        z-index: -5;
    }
</style>
<script>
    import {resizeView} from "../../stores/sysdll"

    import DNNtemplate from "../Custom/DNNtemplate.svelte"
    // @ts-ignore
    import RNNtemplate from "../Custom/RNNtemplate.svelte"
    import SOMtemplate from "../Custom/SOMtemplate.svelte"
    
    let dnnOptionSlide, 
        rnnOptionSlide,
        somOptionSlide, 
        dnnDescription, 
        rnnDescription,
        somDescription

    function selectTemplate(e){
        const option = e.currentTarget.dataset.option

        if(option === 'rnn'){
            const position = rnnOptionSlide.style.left

            if( position != "0px") rnnOptionSlide.style.left = "0px"
            else rnnOptionSlide.style.left = $resizeView ? "-1350px" : "-1100px"
        }

        if(option === 'dnn'){
            const position = dnnOptionSlide.style.left

            if(position != "0px"){ 
                rnnOptionSlide.style.left = "-1600px"
                dnnOptionSlide.style.left = "0px"
            }
            else{
                rnnOptionSlide.style.left = $resizeView ? "-1350px" : "-1100px"
                dnnOptionSlide.style.left = $resizeView ? "-1250px" : "-990px"
            }
        }

        if(option === "som"){
            const position = somOptionSlide.style.left
            
            if(position != "0px"){
                somOptionSlide.style.left = "0px"
                rnnOptionSlide.style.left = "-1700px"
                dnnOptionSlide.style.left = "-1600px"
            }else{
                somOptionSlide.style.left = $resizeView ? "-1150px" : "-880px"
                rnnOptionSlide.style.left = $resizeView ? "-1350px" : "-1100px"
                dnnOptionSlide.style.left = $resizeView ? "-1250px" : "-990px"
            }
            
        }
    }

    function showDescription(e){
        const target = e.currentTarget.id

        if(target === "dnn-option") dnnDescription.style.opacity = "1"
        if(target === "rnn-option") rnnDescription.style.opacity = "1"
        if(target === "som-option") somDescription.style.opacity = "1"
    }

    function hideDescription(){
        dnnDescription.style.opacity = "0"
        rnnDescription.style.opacity = "0"
        somDescription.style.opacity = "0"
    }
    </script>

<div id="custom" class:changeView={$resizeView !== true}>
    <div bind:this={somOptionSlide} id="som-option" style="{$resizeView ? "left: -1150px;" : "left: -880px;"}"
    on:mouseenter={showDescription}
    on:mouseleave={hideDescription}>
        <SOMtemplate/>
        <button data-option="som" on:click|preventDefault={selectTemplate}>
            <span>
                SOM
            </span>
        </button>
    </div>
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
            <h1>Deep<br>Neural<br>Network</h1>
            <h3>Type: supervised learning</h3>
            <p>Basic deep learning neural network.</p>
            <p>Neurons per hidden layer and amount of iterations &#40;epochs&#41; are statically preset.</p>
        </div>
        <div bind:this={rnnDescription} id="rnn-description">
            <h1>Recurrent<br>Neural<br>Network</h1>
            <h2>&#40;LSTM enhanced&#41;</h2>
            <h3>Type: supervised learning</h3>
            <p>Advanced neural network in Machine Learning. 
                Enchanced version with Long Short Term Memory &#40;LSTM&#41; supported layers.
                Advantageous for time series forecasting.</p>
            <p>This template is recommended for deducing and deriving analysis from long sequence datasets, for example stock prices.</p>
        </div>
        <div bind:this={somDescription} id="som-description">
            <h1>Self<br>Organizing<br>Map</h1>
            <h3>Type: unsupervised learning</h3>
            <p>Cluster based neural network. Useful for feature detection.</p>
            <p>The template develops a data visual image pattern from unlabeled data.</p>
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
        margin-left: 0px;
        z-index: 0;
        transition: margin .5s ease-in-out;
    }

    #custom.changeView{
        margin-left: 300px !important;
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

    #dnn-option, 
    #rnn-option, 
    #som-option{
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

    #som-option{
        display: flex;
        position: absolute;
        height: 100vh;
        width: 100%;
        background: white;
        z-index: -3;
        left: -890px;
    }

    #description{
        width: 300px;
        margin-right: 10px;
        text-align: left;
    }

    #dnn-description,
    #rnn-description,
    #som-description{
        display: flex;
        flex-direction: column;
        position: absolute;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        text-align: right;
        color: black;
    }

    #dnn-description h1,
    #rnn-description h2,
    #som-description h1{
        margin-bottom: 10px;
    }

    #dnn-description h3,
    #rnn-description h3,
    #som-description h3{
        margin: 1px 0;
        font-weight: bold;
    }

    #dnn-description > *,
    #rnn-description > *,
    #som-description > *{
        text-align: left;
    }

    #rnn-description p:nth-child(5),
    #som-description p:nth-child(4){
        margin-top: 10px;
    }

    #dnn-description{
        z-index: 1;
    }

    #dnn-description{
        z-index: 2;
    }
    
    #som-description{
        z-index: 3;
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
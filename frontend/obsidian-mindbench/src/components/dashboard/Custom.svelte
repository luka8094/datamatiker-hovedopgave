<section>
    <div id="dnn-option">
        <p>DNN</p>
    </div>
    <div id="rnn-option">
        <p>RNN</p>
    </div>
    <h1>Custom models section</h1>
    <p>You'll upload a file here</p>
</section>

<style>
    section{
        display: flex;
        position: relative;
        flex-direction: column;
        width: calc(100% - 300px);
        justify-content: center;
        align-items: center;
        background: rgba(100,100,10,.5);
        z-index: 0;
        overflow: hidden;
    }

    h1{
        margin-top: auto;
    }

    p{
        margin-bottom: auto;
    }

    #dnn-option, #rnn-option{
        position: relative;
        transition: left .5s ease-in-out;
    }

    div > p{
        height: 100px;
        width: 100%;
        transform: rotate(270deg);
        transform-origin: right;
        position: relative;
        top: -15px;
        right: 50px;
        font-size: 3em;
        text-align: end;
        font-weight: 600;
        padding: 10px;
    }

    #dnn-option{
        display: flex;
        position: absolute;
        height: 100vh;
        width: 400px;
        background: blue;
        z-index: -1;
        left: -300px;
    }

    #rnn-option{
        display: flex;
        position: absolute;
        height: 100vh;
        width: 450px;
        background: orange;
        z-index: -2;
        left: -250px;
    }

    #dnn-option:hover{
        left: -200px;
    }

    #dnn-option:hover+#rnn-option{
        left: -320px;
    }

    #rnn-option:hover{
        left: -200px;
    }
</style>
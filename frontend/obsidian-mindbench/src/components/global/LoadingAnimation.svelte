<div class="loading-animation">
    <img src="/loading_cog.svg" alt="loading"/>
</div>

<style>
   .loading-animation{
        display: flex;
        position: relative;
        height: 100px;
        width: 100px;
        margin: auto;
        background: white;
    }

    .loading-animation img{
        display: flex;
        position: absolute;
        left: 25px;
        top: 25px;
        height: 50px;
        width: 50px;
        object-fit: contain;
        margin: auto;
        animation: rotate 2s infinite linear;
        transform-origin: center;
    }

    @keyframes rotate {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>
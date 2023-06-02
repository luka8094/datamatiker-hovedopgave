<script>
    import {onMount, afterUpdate} from "svelte"
    import {resizeView, user, welcome} from "../../stores/sysdll"
    import ParticlesNetwork from "../ParticleNetworkBackground/ParticlesNetwork.svelte"

    afterUpdate(() => {
        if(!$welcome){
            $welcome = true
            $welcome = $welcome
        }
        return
    })
</script>

<div style="{ $resizeView ? "padding-left: 0px;" : "padding-left: 300px"}">
    <ParticlesNetwork/>
    <div id="version-notice">
        <p>Build v3.9.0.2</p>
    </div>
    <h1>Welcome to the dashboard</h1>
    <p class:showUsername={$welcome}>Welcome back, <strong>{$user.username}</strong></p>
</div>

<style>
    div{
        display: flex;
        height: inherit;
        position: absolute;
        z-index: -1;
        width: 100%;
        padding-left: 300px;
        transition: padding 1s ease-in-out;
    }

    #version-notice{
        display: flex;
        height: 50px;
        width: 60px;
        position: absolute;
        right: 1px;
        top: -10px;
        z-index: 0;
        background: transparent;
        align-items: center;
    }

    #version-notice p{
        position: 0;
        opacity: 1;
    }

    h1{
        margin: auto;
        text-align: center;
    }

    p{
        position: absolute;
        right: 10px;
        bottom: 10px;
        opacity: 0;
        transition: opacity 3s ease-in-out;
    }

    p.showUsername{
        opacity: 1;
    }
</style>
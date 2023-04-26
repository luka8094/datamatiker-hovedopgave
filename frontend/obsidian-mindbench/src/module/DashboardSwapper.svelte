<script context="module">
    import Splash from "../components/dashboard/Splash.svelte"
    import Prediction from "../components/dashboard/Prediction.svelte"
    import Custom from "../components/dashboard/Custom.svelte"

    let VIEW = Splash

    export function dashboardSetter(view="splash"){
        if(view == "splash") VIEW = Splash
        if(view == "custom") VIEW = Custom
        if(view == "sample") VIEW = Prediction
    }
</script>

<svelte:component this={VIEW}/>
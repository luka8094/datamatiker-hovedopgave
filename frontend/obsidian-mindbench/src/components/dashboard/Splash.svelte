<script>
    import {resizeView} from "../../stores/sysdll"
</script>

<div style="{ $resizeView ? "padding-left: 0px;" : "padding-left: 300px"}">
    <h1>Welcome to the dashboard</h1>
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

    h1{
        margin: auto;
        text-align: center;
    }
</style>
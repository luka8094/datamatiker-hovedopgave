<script>
    import {page} from "$app/stores"
    import Navigator from "../components/Global/Navigator.svelte";

    console.log("Regualar console log: %s", $page.url.pathname)
</script>

<Navigator/>

<slot />
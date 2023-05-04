<script>
    import {Route} from "svelte-navigator"
    import PathProtection from "./PathProtection.svelte"

    export let path

</script>

<Route {path}>
    <PathProtection>
        <slot />
    </PathProtection>
</Route>

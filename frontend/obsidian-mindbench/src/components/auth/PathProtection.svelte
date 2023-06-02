<script>
    import {authorized, user} from "../../stores/sysdll"
    import {useNavigate, useLocation} from "svelte-navigator"

    const navigate = useNavigate()
    const location = useLocation()

    $: if(!$authorized){
        $user = null

        navigate("/",{
            state: {from: $location.pathname},
            replace: true
        })
    }
</script>

{#if $authorized && $user}
    <slot />
{/if}
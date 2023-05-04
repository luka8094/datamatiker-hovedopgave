<script>
    import {authorized} from "../../stores/sysdll"
    import {useNavigate, useLocation} from "svelte-navigator"

    const navigate = useNavigate()
    const location = useLocation()

    $: if(!$authorized){
        navigate("/",{
            state: {from: $location.pathname},
            replace: true
        })
    }
</script>

{#if $authorized}
    <slot />
{/if}
<script>
    import {authorized} from "../../stores/sysdriver"
</script>

{#if $authorized}
    <slot/>
{/if}
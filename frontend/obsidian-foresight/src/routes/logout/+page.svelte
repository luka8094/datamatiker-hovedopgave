<script>
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import {authorized} from "../../stores/mainsys"
    /*import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()
    */

   function logout(){
        $authorized = null

        goto("/") 
    }
</script>


<section on:submit={logout}>
    <form>
        <h1>logout</h1>
        <input type="submit">
    </form>
</section>

<style>
    section{
        display: flex;
        height: 100vh;
        width: 100%;
        background: rgba(50,50,100,.5);
        align-items: center;
        justify-content: center;
    }

    form{
        display: flex;
        flex-direction: column;
        height: 300px;
        width: 250px;
        background: rgba(100,100,100,.5)
    }
</style>
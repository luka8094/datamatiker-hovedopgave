<script>
    import {authorized} from "../../stores/sysdriver"
    import {Router, Link, Route, useNavigate} from "svelte-navigator"
    import Login from "../../pages/Login.svelte"
    import Main from "../../pages/Main.svelte"

    function logout(){
        $authorized = false
    }
</script>


<Router>
    {#if $authorized}
        <nav>
            <div on:click={logout}>
                <Link to="/">Logout</Link>
            </div>
            <div>
                <Link to="/">Test</Link>
            </div>
            <div>
                <Link to="/">Test</Link>
            </div>
        </nav>
    {/if}
    <Route path="/" component={Login}/>
    <Route path="/dashboard" component={Main}/>
</Router>

<style>
    nav{
        display: flex;
        height: 100px;
        width: 100%;
        background: rgba(100,150,10,.5);
    }

    nav div{
        display: flex;
        width: 100px;
        height: 150px;
    }

    nav div:first-child{
        margin-left: auto;
    }
</style>
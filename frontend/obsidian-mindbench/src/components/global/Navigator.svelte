<script>
    import {authorized} from "../../stores/sysdriver"
    import {Router, Link, Route, useNavigate} from "svelte-navigator"
    import Login from "../../pages/Login.svelte"
    import Main from "../../pages/Main.svelte"
    import Prediction from "../../pages/Prediction.svelte"
    import Custom from "../../pages/Custom.svelte"

    function logout(){
        $authorized = false
    }
</script>


<Router>
    {#if $authorized}
        <nav>
            <div class="main-menu">
                <div on:click={logout}>
                    <Link to="/">Logout</Link>
                </div>
                <div>
                    <Link to="/app/sample">Sample</Link>
                </div>
                <div>
                    <Link to="/app/create">Create model</Link>
                </div>
                <div>
                    <Link to="/app">Test</Link>
                </div>
            </div>
        </nav>
    {/if}
    <Route path="/" component={Login}/>
    <Route path="/app" component={Main}/>
    <Route path="/app/create" component={Custom}/>
    <Route path="/app/sample" component={Prediction}/>
</Router>

<style>
    nav{
        display: flex;
        position: absolute;
        height: 100px;
        width: 100%;
        background: rgba(100,150,10,.5);
    }

    nav div{
        display: flex;
        width: 100px;
    }

    .main-menu{
        display: flex;
        border: solid 1px black;
        width: fit-content;
    }

    .main-menu:first-child{
        margin-left: auto;
    }

    .main-menu div{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (min-width: 1200px){
        .main-menu{
            margin-right: 200px;
        }
    }
</style>
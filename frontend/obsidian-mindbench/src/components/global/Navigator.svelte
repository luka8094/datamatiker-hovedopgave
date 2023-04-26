<script>
    import {authorized, VIEW} from "../../stores/sysdriver"
    import {Router, Link, Route, useNavigate} from "svelte-navigator"
    import Login from "../../pages/Login.svelte"
    import Main from "../../pages/Main.svelte"


</script>

<Router>
    <Route path="/" component={Login}/>
    <Route path="/app" component={Main}/>
</Router>

<style>
    nav{
        display: flex;
        position: sticky;
        height: 70px;
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

    .main-menu button{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0;
        background: transparent;
    }

    @media screen and (min-width: 1200px){
        .main-menu{
            margin-right: 200px;
        }
    }
</style>
<script>
    import {Router, Route} from "svelte-navigator"
    import PathGuard from "../Auth/PathGuard.svelte"
    import Login from "../../pages/Login.svelte"
    import Main from "../../pages/Main.svelte"
    import Intermediary from "../../pages/Intermediary.svelte"
</script>

<Router>
    <Route path="/" component={Login}/>
    <Route path="/_" component={Intermediary}/>
    <PathGuard path="/@app">
        <Main/>
    </PathGuard>
</Router>
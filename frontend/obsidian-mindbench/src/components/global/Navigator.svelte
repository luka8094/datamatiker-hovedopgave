<script>
    import {Router, Route} from "svelte-navigator"
    import PathGuard from "../Auth/PathGuard.svelte"
    import Login from "../../pages/Login.svelte"
    import Main from "../../pages/Main.svelte"
    import Signup from "../../pages/Signup.svelte"
</script>

<Router>
    <Route path="/" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <PathGuard path="/@app">
        <Main/>
    </PathGuard>
</Router>
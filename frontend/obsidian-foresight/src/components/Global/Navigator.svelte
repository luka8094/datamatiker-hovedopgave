<script>
    import {page} from "$app/stores"
    import {Router, Route, link} from "svelte-navigator"
</script>

<!--
<Router>
    <nav>
        <ul>
            <a href="/main" use:link>Main</a>
            <a href="/svelteroutes" use:link>Testpage</a>
            <a href="/login" use:link>Login</a>
            <a href="/userpage" use:link>Dashboard</a>
        </ul>
    </nav>
</Router>
-->

<nav>
    <ul>
        <a href="/main">Main</a>
        <a href="/login">Login</a>
        <a href="/userpage">Dashboard</a>
        <a href="/logout">Logout</a>
    </ul>
</nav>

<style>
    nav{
        display: flex;
        height: 100px;
        width: 100%;
        background: rgba(100,10,10,.5)
    }
</style>
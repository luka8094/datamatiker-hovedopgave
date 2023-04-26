<script>
    import {page} from "$app/stores"
    import {authorized} from "../../stores/mainsys";
    import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    console.log($page.url.pathname)

    
    async function callTest(){
    /*
        const test = await fetch("/test")
        const {data} = await test.json()
        console.log(test, data)

        setTimeout(() => {
            goto("/main")
        }, 5000)
    */
    }

    $: if(!$authorized){
        navigate("/")
    }
</script>

<h1>Testing custom svelte route.</h1>

<form on:submit={callTest()}>
    <input type="text" id="user-input">
    <input type="file" accept="" placeholder="Upload a spreadsheet">
    <input type="submit">
</form>
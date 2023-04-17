<script>
    async function callTest(){
        const test = await fetch("/test")
        const {data} = await test.json()
        console.log(test, data)
    }
</script>


<h1>Testing custom svelte route.</h1>

<form on:submit={callTest()}>
    <input type="text" id="user-input">
    <input type="submit">
</form>
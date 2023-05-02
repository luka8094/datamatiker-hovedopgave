<script>
    import {resizeView} from "../../stores/sysdriver"

    let userInput
    let answer, answerTwo, answerThree

    async function forecast(){
        const response = await fetch("/api/predict", {
            method: 'POST',
            body: JSON.stringify({input: userInput.value}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const {data} = await response.json()
        answer = data

        const testResponse = await fetch("/api/")
    }

    function uploadFile(){

    }

    $: answer = answer
    $: answerTwo = answerTwo
    $: answerThree = answerThree
</script>

<section style="{ $resizeView ? "padding-left: 0px;" : "padding-left: 300px"}">
    <h1>Model tester</h1>
    <p>Forecast values with your trained models here</p>
    
    <form on:submit|preventDefault={forecast}>
        <fieldset>
            <label for="forecast">Forecast</label>
            <input bind:this={userInput} type="text" name="forecast" placeholder="input a value">
            <input type="submit" placeholder="submit">
        </fieldset>
    </form>
    <form on:submit|preventDefault={uploadFile}>
        <input type="file" accept=".h5">
        <input type="submit" value="upload file"/>
    </form>
    {#if answer}
        <p>{answer}</p>
    {/if}
    <!--
    <form>
        <input type="text" id="user-input">
        <input type="file" accept="" placeholder="Upload a spreadsheet">
        <input type="submit">
    </form>
    -->
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        align-items: center;
        padding-top: 100px;
        padding-left: 300px;
    }

    form, fieldset{
        display: flex;
        flex-direction: column;
    }

    form{
        height: 100px;
        width: 250px;
        margin: 10px auto;
    }

    fieldset{
        align-items: center;
    }

    input{
        margin: 10px 0;
    }
</style>
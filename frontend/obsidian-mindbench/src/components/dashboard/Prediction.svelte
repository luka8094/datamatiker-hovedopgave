<script>
    let userInput
    let answer, answerTwo, answerThree

    async function forecast(e){
        e.preventDefault()
        
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

    $: answer = answer
    $: answerTwo = answerTwo
    $: answerThree = answerThree
</script>

<section>
    <article>
    This is a pretrained DNN model
    Give it value and see what it predicts
    </article>
    <form on:submit={forecast}>
        <fieldset>
            <label for="forecast">Forecast</label>
            <input bind:this={userInput} type="text" name="forecast" placeholder="input a value">
            <input type="submit" placeholder="submit">
        </fieldset>
    </form>
    {#if answer}
        <p>{answer}</p>
    {/if}
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        width: calc(100% - 300px);
        background: lightblue;
        overflow: hidden;
    }

    article{
        display: flex;
        background: blue;
        height: 100px;
        width: 300px;
        margin: 10px auto;
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

    p{
        margin: 0 auto auto;
    }
</style>
<script>
    let userInput

    async function forecast(e){
        e.preventDefault()
        
        const response = await fetch("/predict", {
            method: 'POST',
            body: JSON.stringify({input: userInput.value}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const answer = await response.json()
        console.log(answer)
    }
</script>

<section>
    <article>
    This application has a set of trained models
    Try giving it a value to see the predicted value
    </article>
    <form on:submit={forecast}>
        <fieldset>
            <label for="forecast">Forecast</label>
            <input bind:this={userInput} type="text" name="forecast" placeholder="input a value">
            <input type="submit" placeholder="submit">
        </fieldset>
    </form>
</section>

<style>
    section{
        display: flex;
        height: 100vh;
        width: 100%;
        background: lightblue;
    }

    form, fieldset{
        display: flex;
        flex-direction: column;
    }

    form{
        height: 300px;
        width: 250px;
        margin: auto;
    }

    fieldset{
        align-items: center;
    }

    input{
        margin: 10px 0;
    }
</style>
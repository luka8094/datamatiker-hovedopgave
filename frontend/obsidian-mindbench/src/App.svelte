<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Login from './pages/Login.svelte';

  let testFile

  async function testCall(){
    console.log(testFile[0])
    const form = new FormData()

    /*
    for(let i = 0; i < testFile.files.length; i++){
      form.append("file", testFile.files[i])
    }
    */
    form.append("name", "filename")
    form.append("file", testFile[0])
    console.log(form)

    const response = await fetch("/upload-file", {
      method: 'POST',
      body: form
    })

    const data = await response.json()
    console.log(data)
  }
</script>

<main>
  <Login />
  <!--
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
    <form on:submit={testCall}>
      <fieldset>
        <label for="testFile">Upload something</label>
        <input id="testFile" bind:files={testFile} type="file">
        <input type="submit" placeholder="send">
      </fieldset>
    </form>
  </div>
-->
  <!--
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>-->
</main>

<style>
  /*
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }*/

  fieldset{
    display: flex;
    flex-direction: column;
  }
</style>

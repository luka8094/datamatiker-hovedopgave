<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Login from './pages/Login.svelte'
  import Navigator from './components/global/Navigator.svelte'
  import {authorized} from './stores/sysdriver'

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

<Navigator/>

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

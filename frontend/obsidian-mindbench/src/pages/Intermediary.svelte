<script>
    import {authorized} from "../stores/sysdll"
    import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    ;(async () => {
        const token = await fetch("/api/user", {
            method: 'POST',
            credentials: 'include'
        })
        const {data} = await token.json()
        console.log("data %s, token %s", data, token.status)
        console.log(token)

        if(data && token.status === 202){
            $authorized = true

            setTimeout(() => {
                navigate("/@app")
                },
            5000)
        }
        else{ 
            navigate("/")
        }
    })()
</script>

<section>
    <h1>Loading</h1>
</section>

<style>
    section{
        display: flex;
        height: 100vh;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    h1{
        margin: auto;
        content: 'Loading';
        animation: loading 5s ease infinite;
    }

    h1:focus{
        outline: none;
    }

    @keyframes loading{
        0%{
            content: 'Loading';
        }
        33%{
            content: 'Loading.';
        }
        66%{
            content: 'Loading..';
        }
        100%{
            content: 'Loading...';
        }
    }
</style>
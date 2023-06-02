<script>
    import {authorized, user, bigQuery} from "../stores/sysdll"
    import {useNavigate} from "svelte-navigator"

    const navigate = useNavigate()

    ;(async () => {
        const token = await fetch("/api/user", {
            method: 'POST',
            credentials: 'include'
        })
        const {data} = await token.json()

        if(data.authorized && token.status === 202){
            $authorized = data.authorized
            $bigQuery = data.bigquery
            $user = data.user.userdata

            navigate("/@app")
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
self.onmessage = async function(message){
    const response = await fetch("/api/user", {
        method: 'PATCH',
        credentials: 'include',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })

    if(response.status === 200) return console.log("exit 1: process complete.")
    else return console.log("exit 0: process interrupted.")
}
import "dotenv/config"
const {GOOGLE_OAUTH_REDIRECT_URL, GOOGLE_CLIENT_ID} = process.env

function getGoogleOAuth(){
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
        redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
        client_id: GOOGLE_CLIENT_ID,
        access_type:'offline',
        response_type:'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(" ")
        
    }
    const qs = new URLSearchParams(options)

    return `${rootURL}?${qs.toString()}`
}

export default getGoogleOAuth

// GitHub OAuth credentials

// By github policy the OAuth tokens can not be public.
// The application is being hosted on heroku, and the values
// are passed via heroku Config Vars.

// To test, replace the values below by your own OAuth credentials,
// or leave empty to use regular github API rate.

module.exports = {
    clientID: process.env.clientID, 
    clientSecret: process.env.clientSecret
}
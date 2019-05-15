
// GitHub OAuth credentials

// By github policy the OAuth tokens can not be public.
// The application is being hosted on heroku, and the values
// are passed via heroku Config Vars.

// To test, replace the values below by your own OAuth credentials,
// or leave empty to use regular github API rate.

const CI = process.env ? process.env.clientID : 0;
const CS = process.env ? process.env.clientSecret : 0;

module.exports = {
    clientID: CI, 
    clientSecret: CS
}
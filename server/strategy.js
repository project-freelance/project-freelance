const Auth0Strategy = require("passport-auth0");
const strategy = new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/login",
    scope: "openid email profile"
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    console.log(profile);
    return done(null, profile);
  }
);

module.exports = strategy;

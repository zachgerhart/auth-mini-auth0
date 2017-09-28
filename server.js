const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const port = 3000;
const app = express();

app.use(session({secret: 'some-random-string'}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
  domain: 'zachgerhart.auth0.com',
  clientID: 'WqJ6Y41hJQG8XfOnACakcjyRTS4XnoN7',
  clientSecret: '05iU_NUycvNxKCKjk2IepKsefStAFIfIpFQxafdB8STgODtfuWdmGnSwsMaj-svA',
  callbackURL: 'http://localhost:3000/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/me'
}), (req, res,next)=> res.status(200).json(req.user));

app.get('/me', (req, res, next)=> res.json(req.user));


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

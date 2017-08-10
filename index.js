const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const port = 3000

const app = express();

app.use(session({secret: 'some-random-string'}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
  domain,
  clientID,
  clientSecret,
  callbackURL
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
}));

app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/auth/me'}))

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.status(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

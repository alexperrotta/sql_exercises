const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const User = require('./models/user');

// We accept the express `app` as an arg. It will be created somewhere else; we are just adding middleware to it.
const setupAuth = (app) => {
    app.use(cookieParser()); // cookie middleware

    app.use(session({  //session middleware
        secret: 'secretserverword',
        resave: true,
        saveUninitialized: true,
    }));

    // configuring the Github Strategy
    passport.use(new GitHubStrategy({
        clientID: '92a1507264f23b98d44b',
        clientSecret: 'c15f48f191d0ad4e095c3b7e9f541e826c696a13',
        callbackURL: 'http://localhost:3000/github/auth',
    }, (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({
            where: {
                github_id: profile.id
            }
        })
        .then(result => {
            return done(null, result[0]);
        })
        .catch(done);
    }))

    // This configures how passport turns a user object into something it can track in a session.
    // done is a callback once it calls the user, in case you wanted to do something after it gets the user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // This configures how passport checks what's in the session to see if the login is still valid.
    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    // initialize passport middleware and register it with express
   app.use(passport.initialize());

   // start passport's session management middleware and register it with express
   app.use(passport.session());

    // register our login, logout, and auth routes
   app.get('/login', passport.authenticate('github'));
   app.get('/logout', (req, res, next) => {
       req.logout();
       res.redirect('/');
   });

   app.get('/github/auth',
    passport.authenticate('github', {
        falureRdirect: '/login'
    }),
        (req, res) => {
            res.redirect('/');
        }
    )
}

// method for checking  for a user
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // denied, redirect to login
    res.redirect('/login');
}


module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;
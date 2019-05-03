// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var _jsy = require('jsy');
var mongoose = require('mongoose');
// load up the user model
var User = mongoose.model('User');
var Member = mongoose.model('Member');
var Charge = mongoose.model('Charge');
var Judge = mongoose.model('Judge');
var Candidat = mongoose.model('Candidat');
var Admin = mongoose.model('Admin');
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // =========================================================================
    // LOCAL LOGIN ============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function(req, email, password, done) {
        console.log("email")
        console.log(email)
        if (email) email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        try {
            process.nextTick(function() {
                User.findOne({
                    'Email': email
                }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) return done({
                        code: 90,
                        error: err
                    });
                    // if no user is found, return the message
                    if (!user) return done(null, false, {
                        code: 91,
                        error: 'Aucun utilisateur trouvé.'
                    });
                    console.log(user.validPassword(password))
                    if (!user.validPassword(password)) return done(null, false, {
                        code: 92,
                        error: 'Mot de passe incorrect.'
                    });
                    // all is well, return user
                    else {
                        if (user.UserType == 'a') {
                            console.log("a:admin")
                        }
                        if (user.UserType == 'c') {
                            console.log("c:candidat")
                        }
                        if (user.UserType == 'ch') {
                            console.log("ch:charge")
                        }
                        if (user.UserType == 'j') {
                            console.log("j:judge")
                        }
                        if (user.UserType == 'm') {
                            console.log("m:membre")
                        }
                        console.log('user')
                        console.log(user)
                        return done(null, user);
                    }
                });
            });
        } catch (e) {
            console.log('err', e);
            return done(null, false, {
                code: 91,
                error: 'Erreur'
            });
        }
    }));
    // =========================================================================
    // LOCAL Signin ============================================================
    // =========================================================================
    passport.use('local-signup-ajax', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function(req, email, password, done) {
        console.log(req.body);
        var error = false;
        var returnmessage = [];
        var newUser = new User();
        req.handledData = {};
        if (email) email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                console.log(2);
                User.findOne({
                    'Email': email
                }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) return done(err);
                    // check to see if theres already a user with that email
                    if (user) {
                        console.log(3);
                        return done(null, false, {
                            code: 61,
                            error: 'Cet e-mail est déjà pris.'
                        });
                    } else {
                        console.log(4);
                        // create the user
                        newUser.Email = email;
                        newUser.FirstName = "emailemailemail";
                        newUser.LastName = "kastefd";
                        newUser.Email = email;
                        newUser.Password = newUser.generateHash(password);
                        newUser.UserType = 'c';
                     
                        newUser.save(function(err, user) {
                            console.log("err")
                            console.log(err)
                            if (err) return done(err);
                            return done(null, user);
                        });
                    }
                });
                // if the user is logged in but has no local account...
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user, {
                    code: 66,
                    error: 'User is logged in and already has a local account. You should log out before trying to create a new account. '
                })
            }
        });
        console.log('ok');
    }));
};
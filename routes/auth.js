var express = require('express');
var mongoose = require('mongoose');
//var router = express.Router();
var db_users = mongoose.model('Candidat');
// var db_users = require('../models/users');
/* GET login route info. */
module.exports = function(app, passport) {


app.get('/', function(req, res, next) {
    res.send('*** Liste login des web services ***');
});
//API LOGOUT
app.get('/logout', function(req, res, next) {
    delete req.session.resData;
    delete req.session.mailsent;
    req.logout();
    res.redirect('/');
});

//SIGNUP PATIENT
app.post('/login', function(req, res, next) {
    console.log("login")
    passport.authenticate('local-login', function(err, user, info) {
        console.log("resp")
        if (info) {
            res.json({
                error: true,
                info: info
            })
        } else {
            req.login(user, function(err) {
                if (err) {
                    res.json({
                        error: true,
                    })
                } else {
                    req.session.user = user;
                    res.json({
                        error: false,
                        user_id: user._id,
                        user: user
                    })
                }
            });
        }
    })(req, res, next);
});

//Signin Candidat
app.post('/signin/candidat', function(req, res, next) {
    console.log("done")
    console.log(req.body)
    console.log(req.body.password)
        passport.authenticate('local-signup-ajax', function(err, user, info) {
                console.log('user')
                console.log(user)
            if (info) {
                res.json(info)
            }
            else {
                req.login(user, function(err) {
                    if (err) {
                        res.json({
                            error: true,
                        })
                    }
                    req.session.user = user;
                    res.json({
                        error: false,
                        user_id: user._id,
                        user: req.body
                    })
                });
            }
        })(req, res, next);
    })
}

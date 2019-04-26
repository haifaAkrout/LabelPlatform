var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db_users = require('../models/User');
// var db_users = mongoose.model('Users');
// load up the user model

module.exports = function(app) {
/* GET users route info. */
app.get('/users/', function(req, res, next) {
    res.send('*** Liste des web services ***');
});
/* GET ALL users. */
app.get('/users/getall', function(req, res, next) {
    
    db_users.find({}).exec(function(err, users) {
        if ((!err) && (users)) {
            return res.json({
                error: false,
                users: users
            })
        } else return res.json({
            error: true
        })
    })
});
/* Add user. */
app.post('/users/add', function(req, res, next) {
    console.log('req.body')
    console.log(req.body)
    if ((req.body) && (req.body.FirstName) && (req.body.LastName) && (req.body.Email) && (req.body.Password)) {
        var email = req.body.Email.toLowerCase();
        db_users.findOne({
            Email: email
        }, function(err, userp) {
            if ((!userp) && (!err)) {
                var newuser = new db_users();
                newuser.FirstName = req.body.FirstName;
                newuser.LastName = req.body.LastName;
                newuser.Email = email;
                newuser.password = newuser.generateHash(req.body.Password);
                newuser.save(function(err) {
                    if (err) {
                        return res.json({
                            error: true
                        })
                    } else {
                        return res.json({
                            error: false
                        })
                    }
                });
            } else {
                return res.json({
                    error: true,
                    detail: "e-mail existe déja!"
                })
            }
        });
    } else {
        return res.json({
            error: true,
            detail: "Verifier votre champs!"
        })
    }
});
/* Remove user. */
app.post('/users/remove', function(req, res, next) {
    if (req.body.user_id) {
        db_users.remove({
            _id: req.body.user_id
        }, function(err, data) {
            if ((!err) && (data)) {
                return res.json({
                    error: false
                });
            } else return res.json({
                error: true
            });
        });
    } else return res.json({
        error: true
    });
});
/* Update user. */
app.post('/users/update', function(req, res, next) {
    if (req.body.user_id) {
        db_users.findOne({
            _id: req.body.user_id
        }, function(err, user) {
            if ((!err) && (user)) {
                if (req.body.FirstName) user.FirstName = req.body.FirstName;
                if (req.body.LastName) user.LastName = req.body.LastName;
                if (req.body.Email) user.Email = req.body.Email;
                user.save(function(err) {
                    if (err) {
                        return res.json({
                            error: true
                        })
                    } else {
                        return res.json({
                            error: false
                        })
                    }
                });
            } else return res.json({
                error: true,
                msg: "user inexistant"
            });
        });
    } else return res.json({
        error: true
    });
});
}


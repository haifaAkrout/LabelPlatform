var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('Candidat');

router.get('/', function (req, res) {
    User.find().exec( function (err, User){
        if (err)
            res.send(err)
        if (!User)
            res.status(404).send();
        else {
            res.json(User);
            console.log(User)
        }
    });
});

router.post('/add', function (req, res) {
    var User1 = new User(req.body)
    User1.save(function (err, User) {
        if (err) {
            res.send(err)
        }
        else
            res.send(User)
    })
    // res.render('judge.twig')
});
module.exports = router;
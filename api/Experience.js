var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/Experience');
const Experience = mongoose.model('Experience');

router.get('/', function (req, res) {
    Experience.find().exec( function (err, experiences){
        if (err)
            res.send(err)
        if (!experiences)
            res.status(404).send();
        else {
            res.json(experiences);
            console.log(experiences)
        }
    });
});
router.post('/add', function (req, res) {
    var Experience1 = new Experience({
        Title:"experi1",
        Company:"Esprit",
        Location:"Tunis",
        Description:"Desss",
        StartDate:Date.now(),
        EndDate:Date.now(),
        currentlyWork:true
    })
    Experience1.save(function (err, experiences) {
        if (err) {
            res.send(err)
        }
        else
            res.send(experiences)
    })
});
module.exports = router;
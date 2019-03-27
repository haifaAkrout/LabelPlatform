var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/Education');
const Education = mongoose.model('Education');

router.get('/', function (req, res) {
    Education.find().exec( function (err, experiences){
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
    var Education1 = new Education({
        School:"Esprit",
        Degree:"hell",
        FieldOfStudies:"sport",
        Description:"fuck you",
        StartDate:Date.now(),
        EndDate:Date.now()
    })
    Education1.save(function (err, experiences) {
        if (err) {
            res.send(err)
        }
        else
            res.send(experiences)
    })
});
module.exports = router;
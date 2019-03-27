var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/Link');
const Link = mongoose.model('Link');

router.get('/', function (req, res) {
    Link.find().exec( function (err, experiences){
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
    var Link1 = new Link({
        type: "Instagram"

    })
    Link1.save(function (err, experiences) {
        if (err) {
            res.send(err)
        }
        else
            res.send(experiences)
    })
});
module.exports = router;
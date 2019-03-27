var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/Response');
const Response = mongoose.model('Response');

router.get('/', function (req, res) {
    Response.find().exec( function (err, experiences){
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
    var Response1 = new Response({
        text:"REsponeee1",
        verify:true
    })
    Response1.save(function (err, experiences) {
        if (err) {
            res.send(err)
        }
        else
            res.send(experiences)
    })
});
module.exports = router;
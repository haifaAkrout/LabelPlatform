var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/Questionnaire');
const Questionnaire = mongoose.model('Questionnaire');





router.get('/', function (req, res) {
    Questionnaire.find().exec( function (err, experiences){
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


    var Questionnaire1 = new Questionnaire({
        text:"questionnaire2",
        type:"souel2"
    })
    Questionnaire1.save(function (err, experiences) {
        if (err) {
            res.send(err)
        }
        else
            res.send(experiences)
    })






});

router.post('/:id/add', function (req, res) {


    var id = req.params.id;
    require('../models/Response');
   var Response = mongoose.model('Response');
    var resp = new Response({
        text:"Response1",
        verify:true
    });
    Questionnaire.findById(id).exec(function (err , todo) {
        todo.responses.push(resp)
        todo.save(function (err , tod) {
            if (err)
                res.send(err);
            else
                res.send(tod)
        });

    });

});


module.exports = router;
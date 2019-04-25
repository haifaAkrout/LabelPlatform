var express = require('express');
var bodyParser = require("body-parser");
var Review=require('../models/Review');

var router = express.Router();
var mongoose = require('mongoose');
require("../models/Questionnaire")
const  Questionnaire=mongoose.model("Questionnaire");




router.get('/', function (req, res){

  Questionnaire.find().exec(function (err,Questionnaire1) {
        // var list=[];

        // for (var i in Questionnaire1)
        // {
        //   if(Questionnaire1[i].type==="QuestionJury"){
        //       list.push(Questionnaire1[i])
        //   }
        //
        // }
res.send(Questionnaire1)

    });

    });
router.post('/add', function (req, res) {

    // var Question1 = new Questionnaire({
    //     text:req.body.text,
    //     type:req.body.type
    // })





    var Question1 = new Questionnaire({
        text:"\n" +
            "How many members do you have in your team ?",
        type:"QuestionJury"
    })

    // var Questionnaire1 = new Questionnaire({
    //     text:"questionnaire2",
    //     type:"souel2"
    // })
    // Question1.save(function (err,Questionnaire1) {
    //     if (err) {
    //         res.send(err)
    //     }
    //     else
    //         res.send(Questionnaire1)
    // })
    Question1.save(function (err, Questionnaire2) {
        if (err) {
            res.send(err)
        }
        else
            res.send(Questionnaire2)
    })






});

router.post('/:id/add', function (req, res) {


    var id = req.params.id;
    require('../models/Response');
   var Response = mongoose.model('Response');
    var resp = new Response({
        text:req.body.text,
        verify:true,
        type:req.body.type
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
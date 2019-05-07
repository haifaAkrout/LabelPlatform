var express = require('express');
var bodyParser = require("body-parser");
var Review=require('../models/Review');

var router = express.Router();
var mongoose = require('mongoose');
require("../models/Questionnaire")
var  Questionnaire=mongoose.model("Questionnaire");




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
    var Response = mongoose.model('Response');

    var Question1 = new Questionnaire({
        text:req.body.Question,
        type:"QuestionJury"
    })
    var resp1= new Response({
        text:req.body.Response1,
        verify:true,
        type:req.body.type1
    });
    var resp2 = new Response({
        text:req.body.Response2,
        verify:true,
        type:req.body.type2
    });

    var resp3 = new Response({
        text:req.body.Response3,
        verify:true,
        type:req.body.type3
    });
Question1.responses.push(resp1);
Question1.responses.push(resp2);
Question1.responses.push(resp3);
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
    Question1.save();








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
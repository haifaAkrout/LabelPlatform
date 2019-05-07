var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');
require("../models/User")
const candidat = mongoose.model('Candidat');
const judge = mongoose.model('Judge');
var ReviewCharge=require('../models/ReviewCharge');
var Review=require('../models/Review');
var auth = require('../api/auth');
var ResponseJudge = require('../models/ResponseJudge');
require("../models/Questionnaire")
const  Questionnaire=mongoose.model("Questionnaire");

router.post('/:id/response',function (req, res) {
    var id = req.params.id;
    console.log(id)
    reponse = mongoose.model('reponse',ResponseJudge)
    var response = new reponse(req.body);
    response.save()
    Questionnaire.findById(id).exec(function (err , questionnaire1) {
        questionnaire1.responses.push(response)
        questionnaire1.save(function (err , questionnaire1) {
            if (err)
                res.send(err);
            else
                res.send(questionnaire1.responses)
        });
        console.log(questionnaire1.type)

    });

});
router.post('/:idJudge/:idCandidature/addAvis',function (req,res) {
    console.log("jjjjjj")
    const Review=mongoose.model('Review')
    console.log(req.body.text);
    reviewJudge1=new Review(req.body)
    reviewJudge1.createdBy=req.params.idJudge;
    reviewJudge1.candidat=req.params.idCandidature;

    reviewJudge1.save();

    candidat.findById(req.params.idCandidature).exec(function (err,candidat1) {
        candidat1.review2.push(reviewJudge1);
        candidat1.Status="Traité";

        if(req.body.type==="negatif")
        {
            candidat1.countNegatif+=1
        }
        if(req.body.type==="positif")
        {
            candidat1.countPositif+=1
        }
        candidat.findByIdAndUpdate(req.params.idCandidature, candidat1, {new: true}, (err, candidat) => {

            judge.findById(req.params.idJudge).exec(function (err,Judge1) {

               // Judge1.nbredeVotes+=1;

                judge.findByIdAndUpdate(req.params.idJudge, Judge1, {new: true}, (err, judge) => {


                });



            });
        });



    });



})

router.post('/:id/:idJudge/:idCandidature/UpdateAvis',function (req,res) {
    console.log(req.params.id)


    ReviewCharge.findById(req.params.id).exec(function (err,review) {
        review.text= req.body.text;
        const Review=mongoose.model('Review')
        var reviewJudge1 = new Review();
        reviewJudge1.text=review.text;
        reviewJudge1.type=review.type;
        reviewJudge1.createdBy=req.params.idJudge;
        reviewJudge1.candidat=req.params.idCandidature;
        reviewJudge1.save();
        res.send(reviewJudge1)
        candidat.findById(req.params.idCandidature).exec(function (err,candidat1) {
            candidat1.review2.push(reviewJudge1);
            candidat.findByIdAndUpdate(req.params.idCandidature, candidat1, {new: true}, (err, candidat) => {
                res.send(candidat.review2)

            });



        });})

});

router.put('/:idJudge/:idCandidature/refuser',function (req,res) {

    console.log("jjjjjj")
    const Review=mongoose.model('Review')
    console.log(req.body.text);
    reviewJudge1=new Review(req.body)
    reviewJudge1.createdBy=req.params.idJudge;
    reviewJudge1.candidat=req.params.idCandidature;

    reviewJudge1.save();

    candidat.findById(req.params.idCandidature).exec(function (err,candidat1) {

            candidat1.countNegatif+=1
        candidat1.review2.push(reviewJudge1);
        candidat1.Status="Traité";

        candidat.findByIdAndUpdate(req.params.idCandidature, candidat1, {new: true}, (err, candidat) => {

            judge.findById(req.params.idJudge).exec(function (err,Judge1) {

                Judge1.nbredeVotes=1;

                judge.findByIdAndUpdate(req.params.idJudge, Judge1, {new: true}, (err, judge) => {


                });



            });
        });



    });


})



module.exports = router;
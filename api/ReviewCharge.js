var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/ReviewCharge');
const review = mongoose.model('ReviewCharge');
require('../models/User');
const Candidature = mongoose.model('Candidat');
const Charge = mongoose.model('Charge');

router.get('/', function (req, res) {
    review.find().exec( function (err, experiences){
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

router.get('/findById/:idReview', function (req, res) {
    var idR = req.params.idReview;
    review.findById(idR).exec( function (err, review){
        if (err)
            res.send(err)
        if (!review)
            res.status(404).send();
        else {
            res.json(review);
            console.log(review)
        }
    });
});
router.post('/add/:idCh/:idCand', function (req, res) {
    var idC = req.params.idCh;
    var idCand = req.params.idCand;

    Candidature.findById(idCand).then(candida=>
        Charge.findById(idC).then(charge=>
            {
                var rev1 = new review({
                    text : "revue",
                    type: "hello",
                    candidat:candida,
                    estValide:true,
                    cause:"",
                    commentaire: ""
                })
                rev1.save(function (err, experiences) {
                    if (err) {
                        res.send(err)
                    }
                    else
                        res.send(experiences)
                })
            }
        )
    )

});

router.put('/updateAvisCharge/:idProjet/:idCharge', function (req, res) {
    var idP = req.params.idProjet;
    var idC = req.params.idCharge;
    var Projet = require('../models/Project');
    Project = mongoose.model('Project', Projet);

    Project.findById(idP).then(
        projet=> {
            Candidature.findById(projet.createdBy._id).then(candidat => {

                    Charge.findById(idC).then(
                        charge => {
                            var review1 = new review({
                                text: req.body.text,
                                estValide: req.body.estValide,
                                cause: req.body.cause,
                                candidat: projet.createdBy._id
                            });
                            review1.save().then(console.log("review saved"));
                            console.log("revueeeeeeeeeeeeeeeeeeeeeee");
                            console.log(review1);
                            charge.review = review1.id;
                            Charge.findByIdAndUpdate(idC, charge, {new: true}, (err, membre) => {
                                console.log("updated charge with review");

                            });
                            console.log("charge with review");
                            console.log(charge.review);
                        }
                    )

                res.send("updated")
            }
            );


        });
});

//avis candidature
router.put('/updateCandidature/:idProjet', function (req, res) {
    var idP = req.params.idProjet;
    var Projet = require('../models/Project');
    Project = mongoose.model('Project', Projet);

    Project.findById(idP).then(
        projet=>{

                console.log("id candidature");
                console.log(projet.createdBy)
                Candidature.findById(projet.createdBy).then(candidature=>{
                    candidature.Status=req.body.Status;
                    Candidature.findByIdAndUpdate(projet.createdBy, candidature, {new: true}, (err, membre) => {
                        console.log("updated candidature with status ");

                    });
                })

            res.send("updated candidature");
        }

    );



});


router.put('/updateCandidatureByCand/:idCand', function (req, res) {
    var idD = req.params.idCand;



                Candidature.findByIdAndUpdate(idD, req.body, {new: true}, (err, membre) => {
                    console.log("updated status cand ");

                });






});

router.get('/redigerAvisCharge/:idSession',(req,res)=>{
    var Session= require('../models/Session');
    var idS = req.params.idSession;
    Session.findById(idS)
        .populate({path: 'Project.createdBy',         populate: {path: 'TypeLabel'}})
        .populate({path: 'Project.createdBy',         populate: {path: 'charges'}})
        .populate({path: 'Project.createdBy.charges', populate: {path: 'review'}})
        .then(Session => {
            console.log(Session);
            res.json( Session);

        }).catch(err => {});
});



module.exports = router;
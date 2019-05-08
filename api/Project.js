var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//import model
require('../models/User');
const Membre = mongoose.model('Member');

var Session= require('../models/Session');
var Project = require('../models/Project');
const Label=mongoose.model('Label');
var path = require('path');

//affecter un chargé a une candidature el andha projet
router.post('/affectation/:idProjet/:idCharge', function (req, res) {


    var idP = req.params.idProjet;
    var idC = req.params.idCharge;
    //affecter un questionnaire a un projet
    ProjectByIds = mongoose.model('Project', Projet);
    require('../models/User');
    const Charge1 = mongoose.model('Charge');
    const Candidature = mongoose.model('Candidat');


    //get projet  by id
    ProjectByIds.findById(idP)
        .then(projets => {
            if (!projets) {
                return res.status(404).send({
                    message: "projet not found with id " + idP
                });
            }
            console.log("id candidature");
            console.log(projets.createdBy);
            console.log("id projet");
            console.log(idP);
            console.log("id chargé");
            console.log(idC);
            Candidature.findById(projets.createdBy).exec(function (err, Candidatures) {

                Charge1.findById(idC).exec(function (err,charge) {
                    console.log("liste des charge");
                    console.log(Candidatures.charges)
                    Candidatures.charges = idC;
                    Candidatures.save(function (err, cand) {
                        if (err)
                            res.send(err);
                        else
                            res.send(cand)
                    });
                })


            });

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "charge not found with id " + idC
            });
        }
        return res.status(500).send({
            message: "Error retrieving charge with id " + idC
        });

    });


});


//afficher details projet par idProjet
router.get('/detailsProjets/:idProjet',(req,res)=>{

    var idP = req.params.idProjet;
    var Project= require('../models/Project');
    Project15 = mongoose.model('Project',Project);
    Project15.findById(idP)
        .then(projets => {
            res.json(

                projets
            );

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

});


//get liste des projets par session id
router.get('/listeProjetsparIdSes/:id', function (req, res) {
    console.log('liste des projets par id sessions')

    Session.findById(req.params.id).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(Session => {
            console.log(Session)
            res.json( Session);

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

});

//get projet par id projet par session id
// les questionnaire par id projet par id sessions
router.get('/detailsProjets/:idSession/:idProjet', function (req, res) {
    console.log('liste des projets par id sessions')

    var idS = req.params.idSession;
    console.log(idS)
    var idP = req.params.idProjet;
    Session.findById(idS).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {

            for (var i = 0; i < sessions.Project.length; i++)
            {
                console.log(sessions.Project[i]._id)
                console.log("id projet")
                console.log(idP)
                if( sessions.Project[i]._id == idP )
                {
                    res.json({
                            data:  sessions.Project[i],
                            NomSession:  sessions.Name,
                            DateDebutSession:sessions.StartDate,
                            idSessionBack:sessions._id
                        }
                    )

                }
                else
                {
                    console.log("not found")
                    console.log(idP)
                    console.log(sessions.Project[i]._id)
                    // res.send("project not found")
                }

            }


        }).catch();

});


//supprimer membre par id projet w membre w session
router.get('/ListeMembres/:idSession/:idProjet', function (req, res) {
    console.log('liste des membres dun projet');

    var idS = req.params.idSession;
    console.log(idS)
    var idP = req.params.idProjet;
    console.log(idP)

    Session.findById(idS).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {

            for (var i = 0; i < sessions.Project.length; i++)
            {
                console.log(sessions.Project[i]._id)
                console.log("id projet")
                console.log(idP)
                if( sessions.Project[i]._id == idP )
                {
                    res.json({
                            data:  sessions.Project[i],
                            NomSession:  sessions.Name,
                            DateFinSession:sessions.EndDate,
                            idSessionBack:sessions._id
                        }
                    )


                }
                else
                {
                    // console.log("not found")
                    // console.log(idP)
                    // console.log(sessions.Project[i]._id)
                    // // res.send("project not found")
                }

            }


        }).catch();

});
router.post('/add/:id', function (req, res) {


    Session.findById(req.body.id).exec(function (err , Session) {
        Projecttt = mongoose.model('Project',Project);
        var projet4 = new Projecttt({
            Name:req.body.Name,
            Response1:req.body.Response1,
            Response2:req.body.Response2,
            createdBy:req.body.createdBy

        });
        projet4.save();
        Session.Project.push(projet4);
        Session.save(function (err , Sessionn) {
            if (err)
                res.send(err);
            else
                res.send(Sessionn)
        });

    });

});

module.exports = router


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// router.post('/add',function (req,res) {
//
// var Label1=new Label({
// type:'Label'
//
// });
// Label1.save();
//
// //
// //     Label1.save(function (err,Label ) {
// //         if(err){
// //             res.send(err)
// //         }
// //         else{
// //             res.send(Label1)
// //         }
// //     })
// var Candidature=new Candidat({
//     LastName: 'akrout',
//     FirstName:'abir',
//     Email:'akrout.abir@esprit.tn',
//     Password: 'abir',
//     TypeLabel:Label1.id,
//     Status:'non Traité'
// })
//    Candidature.save();
//
//
//     var Session1=new Session({
//         Name:'Session1',
//         Project:[{  Name: 'ProjetSalleDeSport' ,
//             members:[{
//                 Role:'lead',
//                 LastName: 'Fadhloun',
//                 FirsName:'Feriel',
//                 Email:'Fadhloun.Feriel@esprit.tn',
//                 Password: 'Feriel'
//
//             }],
//             createdBy:Candidature.id
//         }],
//         StartDate:'2016-07-08',
//         EndDate:'2017-06-02'
//     })
//     Session1.save(function (err,Session) {
//         if(err){
//             res.send(err)
//         }
//         else{
//             res.send(Session1)
//         }
//     })
// })


var Session= require('../models/Session');
var Projet = require('../models/Project');
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
                    console.log(charge);
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
        .then(sessions => {
            res.json( sessions.Project);

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

});

//get projet par id projet par session id
// les questionnaire par id projet par id sessions
router.get('/:idSession/:idProjet', function (req, res) {
    console.log('liste des projets par id sessions')

    var idS = req.params.idSession;
    var idP = req.params.idProjet;
    Session.findById(idS).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {

            // res.json(sessions.Project)
            for (var i = 0; i < sessions.Project.length; i++)
            {
                console.log(sessions.Project[i]._id)
                console.log(idP)
                if( sessions.Project[i]._id == idP )
                {
                    res.json(sessions.Project[i].questionnaire)

                }
                else
                    res.send("project not found")
            }


        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

});


//afficher liste des membres mte projet par id projet w id session
router.get('/ListeMembres/:idSession/:idProjet', function (req, res) {
    console.log('liste des membres dun projet');

    var idS = req.params.idSession;
    var idP = req.params.idProjet;
    Session.findById(idS).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {

            // console.log(sessions.Project)
            for (var i = 0; i < sessions.Project.length; i++)
            {
                console.log(sessions.Project[i]._id)
                console.log(idP)
                if( sessions.Project[i]._id == idP )
                {
                    res.json(sessions.Project[i].members)

                }


            }

            res.send("project not found")
        }).catch(err => {
        console.log(err)
    });

});

module.exports = router


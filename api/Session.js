var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Session= require('../models/Session');

var Project= require("../models/Project")
const Label=mongoose.model('Label');
const Candidat = mongoose.model('Candidat');


//getAll request session
router.get('/',(req,res)=>{
    Session.find()
        .then(sessions => {
            /* res.json({
                  status: "success",
                  message: "members retrieved successfully",
                  data: sessions
              });*/
            res.render('Sessions/sessions.twig',{Sessions:sessions});

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
});

router.get('/:id', function (req, res) {
    Session.findById(req.params.id).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {
            // res.json({
            //       sessions
            //  });


            res.render('Sessions/detailsCandidature.twig',{Sessions:sessions});

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
});

//ajout session fergha
router.post('/add',function (req,res) {
    console.log("ajout sessions")
    //
    // var Sessio1=new Session({
    //     Name:'Session Avril',
    //     Status: "En cours",
    //     StartDate:'2019-04-01',
    //     EndDate:'2019-04-30'
    //
    //
    // });
    //
    // Sessio1.save(function (err, Session) {
    //     if (err) {
    //         res.send(err)
    //     }
    //     else
    //         res.send(Session)
    // });

    var Session2=new Session({
        Name:'Session Mars',
        Status: "En cours",
        StartDate:'2019-05-01',
        EndDate:'2019-05-30'


    });



    Session2.save(function (err, Session) {
        if (err) {
            res.send(err)
        }
        else
            res.send(Session)
    });

});




//ajouter projet a une session
router.post('/:idSession/add', function (req, res) {

    var Label1=new Label({
        type:"label",
        SoumissionDate:Date.now(),
        PreLabelDate:Date.now()
    });
/*
    var prelabel=new Label({
        type:"prelabel",
        SoumissionDate:Date.now(),
        PreLabelDate:Date.now()
    });*/
    Label1.save();
  /*  prelabel.save();*/
    var Candidature2=new Candidat({
        LastName: 'Bejaoui',
        FirstName:'chamss',
        Email:'bejaoui1.chamss1@esprit.tn',
        Password: 'chamss',
        TypeLabel:Label1.id,
        Status:'non Traité'
    })

    Candidature2.save();
    var id = req.params.idSession;



    Session.findById(id).exec(function (err , Session) {
        const Project2=mongoose.model('Project')
      //  Project15 = mongoose.model('Project',Project);
        var projet4 = new Project2({
            Name: 'ProjetWeb' ,
            members:[{
                Role:'lead',
                LastName: 'Fadhloun',
                FirsName:'Aziza',
                Email:'Aziza@esprit.tn',
                Password: 'Aziza'}],
            createdBy: Candidature2._id

        });
        projet4.save();
        Session.Project.push(projet4);
        Session.save(function (err , Session) {
            if (err)
                res.send(err);
            else
                res.send(Session)
        });

    });

});


module.exports = router
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var Session= require('../models/Session');
var Project= require('../models/Project');
const Label=mongoose.model('Label');
const Candidat = mongoose.model('Candidat');
const Charge1 = mongoose.model('Charge');
const member = mongoose.model('Member')


//getAll request session
router.get('/',(req,res)=>{
    console.log("liste des sessions")
    Session.find()
        .then(sessions => {
            res.json(sessions);

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
});

// //getAll request charge
router.get('/charges',(req,res)=>{
    console.log("awl el charge");
    require('../models/User');
    const listeCharges = mongoose.model('Charge');
    listeCharges.find()
        .then(charges => {
            res.json(charges
            );

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
});


//get chargé by id
// //getAll request charge
router.get('/charge/:idC',(req,res)=>{
    console.log("get chargé by id");
    require('../models/User');
    var idC = req.params.idC;
    const charge = mongoose.model('Charge');
    charge.findById(idC)
        .then(charges => {
            res.json(charges);
            console.log(charges)

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
});


//ajout session fergha
router.post('/add',function (req,res) {
    console.log("ajout sessions")

    var Sessio512=new Session({
        Name:'Session Juin',
        Status: "En cours",
        StartDate:'2019-06-01',
        EndDate:'2019-06-30'


    });

    Sessio512.save(function (err, Session) {
        if (err) {
            res.send(err)
        }
        else
            res.send(Session)
    });

    var Session23=new Session({
        Name:'Session Mai',
        Status: "En cours",
        StartDate:'2019-05-01',
        EndDate:'2019-05-30'


    });



    Session23.save();

});




//ajouter projet bel details mteou el kol a une session
router.post('/:idSession/add/:idQuest/:idCanda', function (req, res) {



    var id = req.params.idSession;
    var idQ = req.params.idQuest;
    var idCa = req.params.idCanda;

    Candidat.findById(idCa).exec(function (err,candidature) {

        console.log(" id candidature");
        console.log(candidature._id);
        //affecter un questionnaire a un projet
        require('../models/Questionnaire');
        var Questionnaire = mongoose.model('Questionnaire');

        var member1 = new member({
            Role:'lead',
            LastName: 'Fadhloun',
            FirsName:'feriel',
            Email:'feriel@esprit.tn',
            Password: 'feriel',
            LinkFacebook: "https://www.facebook.com/fadhloun.nadia",
            Bio: "feriel",
            Description: "feriel",
            image:"uploads\cin.jpg",
            Cin: "11397109",
            LinkLinkedIn: "https://www.linkedin.com/in/majd-mimoun/"
        });
        member1.save();

        var member2 = new member({
            Role:'CTO',
            LastName: 'Fadhloun',
            FirsName:'mounira',
            Email:'mounira@esprit.tn',
            Password: 'mounira',
            LinkFacebook: "https://www.facebook.com/fadhloun.nadia",
            Bio: "mounira",
            Description: "mounira",
            image:"uploads\cin.jpg",
            Cin: "11397109",
            LinkLinkedIn: "https://www.linkedin.com/in/majd-mimoun/"
        });
        member2.save();

        //get questionnnaire by id
        Questionnaire.findById(idQ)
            .then(questionnaires => {
                if(!questionnaires) {
                    return res.status(404).send({
                        message: "questionnaires not found with id " + idQ
                    });
                }
                // res.json({
                //     message:' questionnaires details are loading',
                //     data:questionnaires
                // });
                Session.findById(id).exec(function (err , Session) {
                    Projecttt = mongoose.model('Project',Project);
                    var projet4 = new Projecttt({
                        Name: 'Projet Sport' ,
                        members:[member1,member2],
                        questionnaire:[questionnaires],
                        createdBy:candidature._id

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


            })
            .catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "questionnaires not found with id " + idQ
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving questionnaires with id " + idQ
                });
            });
    })




});


//get liste des projets par session id
router.get('/listeProjetsparIdSes/:id', function (req, res) {
    console.log('liste des projets par id sessions')

    Session.findById(req.params.id).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {
            res.json( sessions);

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

});



//get liste des projets par session id
router.get('/resultat/:idSession', function (req, res) {
    console.log('liste des projets par id sessions')
    const review = mongoose.model('ReviewCharge');
    var idC = req.params.idCharge;
    var idS = req.params.idSession;
    var idP = req.params.idProjet;
    Session.findById(idS)
        .populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .populate({path: 'Project.createdBy', populate: {path: 'charges'}})
        .populate({path: 'Project.createdBy.charges', populate: {path: 'review'}})
        .then(sessions => {
                console.log(sessions)

                res.send(sessions)

            }
        ).catch();

});


module.exports = router
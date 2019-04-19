var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var Session= require('../models/Session');
var Project= require('../models/Project');
const Label=mongoose.model('Label');
const Candidat = mongoose.model('Candidat');
const Charge1 = mongoose.model('Charge');

//getAll request session
router.get('/',(req,res)=>{
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
// router.get('/charges',(req,res)=>{
//     console.log("awl el charge");
//     require('../models/User');
//     const listeCharges = mongoose.model('Charge');
//     listeCharges.find()
//         .then(charges => {
//             res.json(charges
//             );
//
//         }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving notes."
//         });
//     });
// });
//

//ajout session fergha
router.post('/add',function (req,res) {
    console.log("ajout sessions")

    var Sessio512=new Session({
        Name:'Session Avril',
        Status: "En cours",
        StartDate:'2019-04-01',
        EndDate:'2019-04-30'


    });

    Sessio512.save(function (err, Session) {
        if (err) {
            res.send(err)
        }
        else
            res.send(Session)
    });

    var Session23=new Session({
        Name:'Session Mars',
        Status: "En cours",
        StartDate:'2019-05-01',
        EndDate:'2019-05-30'


    });



    Session23.save();

});




//ajouter projet bel details mteou el kol a une session
router.post('/:idSession/add/:idQuest', function (req, res) {

    var Label1=new Label({
        type:"label",
        SoumissionDate:Date.now(),
        PreLabelDate:Date.now()
    });

    var prelabel=new Label({
        type:"prelabel",
        SoumissionDate:Date.now(),
        PreLabelDate:Date.now()
    });
    Label1.save();
    prelabel.save();
    var Candidature2=new Candidat({
        LastName: 'nadia1',
        FirstName:'nadia1',
        Email:'nadia1@esprit.tn',
        Password: 'hass',
        TypeLabel:prelabel.id,
        Status:'non Traité'
    })

    Candidature2.save();
    var id = req.params.idSession;
    var idQ = req.params.idQuest;

    //affecter un questionnaire a un projet
    require('../models/Questionnaire');
    var Questionnaire = mongoose.model('Questionnaire');


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
                    Name: 'ProjetWeb' ,
                    members:[{
                        Role:'lead',
                        LastName: 'Fadhloun',
                        FirsName:'Nadia',
                        Email:'Naida1@esprit.tn',
                        Password: 'Aziza'},
                        {
                            Role:'lead',
                            LastName: 'Fadhloun',
                            FirsName:'mounira',
                            Email:'mounira@esprit.tn',
                            Password: 'mounira'}],
                    questionnaire:[questionnaires],
                    createdBy:Candidature2.id

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




});





module.exports = router
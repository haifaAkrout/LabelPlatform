var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/ReviewCharge');
const avis = mongoose.model('Avis');
require('../models/User');
const Charge = mongoose.model('Charge');
const Candidature = mongoose.model('Candidat');
nodemailer = require('nodemailer');



router.get('/sendEmailToMember/:idCand', function (req, res, next) {
    var idC = req.params.idCand;


    Candidature.findById(idC).then(cand=> {
        console.log(cand);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fadhlounferiel@gmail.com',
                pass: 'donottrustanyone!27'
            }
        });
        console.log(cand.Email)
        const mailOptions = {
            from: 'fadhlounferiel@gmail.com', // sender address
            to: 'fadhlounferiel@gmail.com', // list of receivers
            subject: "Reponse candidature", // Subject line
            html: '<p> mail from feriel</p>'// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
            {
                console.log("hello ")
                res.send("mail send")
            }
        });

    });
})
router.get('/', function (req, res) {
    Education.find().exec( function (err, experiences){
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
router.post('/addAvis/:idCharge', function (req, res) {
    var idC = req.params.idCharge;

    console.log("ajouter avis")
        Charge.findById(idC).then(charge=>
            {
                console.log(charge)
                var avis1 = new avis({
                    cause : req.body.cause,
                    commentaire: req.body.commentaire,
                    date: Date.now()
                });
                avis1.save().then(console.log("avis created with success"));
                console.log(avis1.id);
                charge.avis = avis1.id;
                Charge.findByIdAndUpdate(idC, charge, {new: true}, (err, membre) => {
                    console.log("updated charge with avis");

                });
            }
        );




});



module.exports = router;
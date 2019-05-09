var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
const candidat = mongoose.model('Candidat');
require('../models/ReviewCharge');
var reviewCharge =require('../models/ReviewCharge');
var avis=require('../models/Avis');
require('../models/User');
const Charge = mongoose.model('Charge');
const Candidature = mongoose.model('Candidat');
nodemailer = require('nodemailer');



router.get('/sendEmailToMember/:idCand', function (req, res, next) {
    var idC = req.params.idCand;

    console.log("sending mail");
    Candidature.findById(idC).then(cand=> {
        console.log(cand);
        var transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'fadhlounferiel@gmail.com',
                pass: 'donottrustanyone!27'
            }
        });
        console.log(cand.Email);
        const mailOptions = {
            from: 'fadhlounferiel@gmail.com', // sender address
            to: 'fadhlounferiel@gmail.com', // list of receivers
            subject: "Reponse candidature", // Subject line
            html: '<p> mail from feriel</p>'// plain text body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            // res.render('index');
            });

        app.listen(port, function(){
            console.log('Server is running at port: ',port);
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
            var review = new reviewCharge({
                text : req.body.cause,
                candidat:"5cd37824f14e0bfb0ce2c64d"
            });
            review.save();
            avis1.save().then(console.log("avis created with success"));
            console.log(avis1._id);
            charge.avis = avis1._id;
            charge.review=review._id;
            Charge.findByIdAndUpdate(idC, charge, {new: true}, (err, membre) => {
                console.log("updated charge with avis");

            });
            candidat.findById("5cd37824f14e0bfb0ce2c64d").exec(function (err,candidat1) {
                candidat1.charges=idC;
                candidat.findByIdAndUpdate("5cd37824f14e0bfb0ce2c64d", candidat1, {new: true}, (err, candidat) => {
                    console.log("updated");

                });


            })
        }
    );




});

// router.post('/addAvis/:idCharge', function (req, res) {
//     var idC = req.params.idCharge;
//
//     console.log("ajouter avis")
//         Charge.findById(idC).then(charge=>
//             {
//                 console.log(charge)
//                 var avis1 = new avis({
//                     cause : req.body.cause,
//                     commentaire: req.body.commentaire,
//                     date: Date.now()
//                 });
//
//                 review.save();
//                 avis1.save().then(console.log("avis created with success"));
//                 console.log(avis1._id);
//                 charge.avis = avis1._id;
//
//                 Charge.findByIdAndUpdate(idC, charge, {new: true}, (err, membre) => {
//                     console.log("updated charge with avis");
//
//                 });
//
//             }
//         );
//
//
//
//
// });



module.exports = router;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require("../models/User")
const candidat = mongoose.model('Candidat');

var ResponseCandidat = require('../models/ResponsesCandidatures');
require("../models/Questionnaire")
const  Questionnaire=mongoose.model("Questionnaire");



//Repondre aux questions
router.post('/:id/:idCandidature/response',function (req, res) {
    var id = req.params.id;
    console.log(id)
    reponse = mongoose.model('reponse',ResponseCandidat)
    var response = new reponse(req.body);
    response. createdBy=req.params.idCandidature;
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
//Refuser candidature
router.post('/:idCandidature/refuser', function(request, response) {

    nexmo.message.sendSms(
        +21658011658, 21658011658, 'Vous n’avez pas la possibilité de déposer une candidature pour les raisons suivantes : age, critère d’innovation',
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
        }
    );

})
//Accepter Candidature
router.post('/:idCandidature/accepter', function(request, response) {

    nexmo.message.sendSms(
        +21658011658, 21658011658, 'Vous avez la possibilité de déposer , un email vous sera fourni',
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
        }
    );
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'haifaakrout123@gmail.com',
            pass: 'haifaakrout126A'
        }
    });
    const mailOptions = {
        from: 'haifakrout123@gmail.com', // sender address
        to: req.body.To, // list of receivers
        subject: req.body.Subject, // Subject line
        html: '<p>'+req.body.Content+'</p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            res.send("Votre email a étè envoyée avec succées");
    });
})
module.exports = router;
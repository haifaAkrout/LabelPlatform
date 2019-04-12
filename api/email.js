var nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const Judge = mongoose.model('Judge');

router.post('/sendEmailToJudge', function (req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'haifaakrout123@gmail.com',
            pass: 'haifa123A@'
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
        {
            var Judge1 = new Judge()
            Judge1.LastName=req.body.LastName;
            Judge1.FirstName=req.body.FirstName;
            Judge1.Email=req.body.To;
            Judge1.Status="en attente";
            Judge1.createdBy="5ca682c594b3478520c09158",
            Judge1.creationDate=new Date();
            Judge1.save();
        }
    });
})

module.exports = router;
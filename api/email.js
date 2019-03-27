var nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();


router.post('/api/send', function (req, res, next) {
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
            res.redirect('/Judges/demandes')
    });
})

module.exports = router;
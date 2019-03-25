var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Judge = mongoose.model('Judge');

router.get('/addCompte',function (req,res,next) {
    res.render('Judges/Compte.twig')
})

router.post('/addCompte',function (req,res) {

    var Judge1 = new Judge(req.body)
    Judge1.save(function (err, Judge) {
        if (err) {
            res.send(err)
        }
        else
            res.send(Judge)
    })
});
module.exports = router;
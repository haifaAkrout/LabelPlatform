var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Judge = mongoose.model('Judge');
var Demande = require('../models/Demande');
router.get('/addCompte',function (req,res,next) {
    res.render('Judges/Compte.twig')
})
router.get('/addJudge',function (req,res,next) {
    res.render('Judges/AddJudge.twig')
})

router.post('/addCompte',function (req,res) {

    var Judge1 = new Judge(req.body)
    Judge1.Status="en attente";
    Judge1.creationDate=new Date();
    Judge1.save(function (err, Judge) {
        if (err) {
            res.send(err)
        }
        else{
            var Demande1 = new Demande({

                Status:'en attente',
                createdBy:Judge1.id

            }) ;
Demande1.save();
          }
    })
});
router.get('/search/:id', function (req, res) {

    var id = req.params.id;
    Judge.findById(id).exec(function (err,Judge) {
        if (err)
            res.status(400).send(err);
        if (!Judge)
            res.status(404).send();
        else
            res.render('Judges/EditJudge.twig',{Judge1:Judge})


    });


});
router.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }


    next();

});

router.delete('/:id/:id1',function (req, res) {
    var id = req.params.id;
    var id1 = req.params.id1;
    Demande.findByIdAndRemove(id , function (err, Demande) {
        if (err)
            res.send(err);

    })
    Judge.findByIdAndRemove(id1, function (err, Judge1) {
        if (err)
            res.send(err);

    })
    res.redirect('/Judges/demandes')
})

router.get('/demandes', function (req, res) {
    Demande.find().populate('createdBy').exec( function (err, Demande){
        if (err)
            res.send(err)
        if (!Demande)
            res.status(404).send();
        else {
            res.render('Judges/listDemande.twig',{demandes:Demande})

        }
    });
});

module.exports = router;
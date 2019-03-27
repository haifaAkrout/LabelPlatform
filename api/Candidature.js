var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Session= require('../models/Session');
var ReviewCharge=require('../models/ReviewCharge');
const candidat = mongoose.model('Candidat');
const Charge= mongoose.model('Charge');
router.get('/:id', function (req, res) {
    Session.findById(req.params.id).populate({path:'Project.createdBy',populate: ({path:'TypeLabel'})}).populate({path:'Project.createdBy',populate: ({path:'review'})}).
    exec( function (err,Session){
        if (err)
            res.send(err)
        if (!Session)
            res.status(404).send();
        else {
       res.render('SecondRound/Candidatures.twig',{Sessions:Session})
//res.send(Session)
        }
    });
});

router.post('/addAvis',function (req,res) {

    var charge1= new Charge({
        LastName:'akrout',
        FirstName:'atef',
        Email:'atef.akrout@esprit.tn',
        Password:'atoufa'
    }) ;
 charge1.save();
var avis=new ReviewCharge({
    text:'pas mal',
    type:'negatif',
    createdBy:charge1.id,
    candidat:"5c9b35bd88e2503fb0f4f53c"
});

 avis.save();

var id="5c9b35bd88e2503fb0f4f53c";
   candidat.findById(id).exec(function (err,candidat1) {
       candidat1.review = avis.id;
       candidat.findByIdAndUpdate(id, candidat1, {new: true}, (err, candidat) => {
           console.log("updated");

       });


   })

})

module.exports = router;
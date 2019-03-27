var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Session= require('../models/Session');
var Project= require('../models/Project');
const Label=mongoose.model('Label');
const Candidat = mongoose.model('Candidat');
router.post('/add',function (req,res) {

var Label1=new Label({
type:'Label'

});
Label1.save();

//
//     Label1.save(function (err,Label ) {
//         if(err){
//             res.send(err)
//         }
//         else{
//             res.send(Label1)
//         }
//     })
var Candidature=new Candidat({
    LastName: 'akrout',
    FirstName:'abir',
    Email:'akrout.abir@esprit.tn',
    Password: 'abir',
    TypeLabel:Label1.id,
    Status:'non Traité'
})
   Candidature.save();


    var Session1=new Session({
        Name:'Session1',
        Project:[{  Name: 'ProjetSalleDeSport' ,
            members:[{
                Role:'lead',
                LastName: 'Fadhloun',
                FirsName:'Feriel',
                Email:'Fadhloun.Feriel@esprit.tn',
                Password: 'Feriel'

            }],
            createdBy:Candidature.id
        }],
        StartDate:'2016-07-08',
        EndDate:'2017-06-02'
    })
    Session1.save(function (err,Session) {
        if(err){
            res.send(err)
        }
        else{
            res.send(Session1)
        }
    })
})
module.exports = router

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Judge = mongoose.model('Judge');

var Demande = require('../models/Demande');
var bcrypt = require('bcrypt-nodejs');
const Nexmo = require('nexmo');
mongoose.set('useFindAndModify', false);
//const privateKey = require('fs').readFileSync(__dirname +"\\"+'private.key');
var mongoose = require('mongoose');
require('../models/Review')

var Project=require('../models/Project')

var Review=mongoose.model('Review');

var Session= require('../models/Session');
var ReviewCharge=require('../models/ReviewCharge');
const Candidat = mongoose.model('Candidat');
const Charge= mongoose.model('Charge');
const nexmo = new Nexmo({
    apiKey: '6c4de09e',
    apiSecret: '0Qr6NuiURwaOxqMG',
    applicationId: '03b973dd-2e0a-404a-bc9d-473f160c95f1',
    //privateKey: privateKey
});
var jwt = require('jsonwebtoken');

router.get('/listJudges', function (req, res) {
    Judge.find().exec( function (err, Judge){
        if (err)
            res.send(err)
        if (!Judge)
            res.status(404).send();
        else {
            res.send(Judge);

        }
    });
});

//affichage des candidatures non traitées

//Le juge ajoute son compte+une demande est envoyé à l'admin
//router.post('/addCompte',function (req,res) {
//     var salt = bcrypt.genSaltSync(10,10);
//     var Judge1 = new Judge(req.body)
//     Judge1.Password=bcrypt.hashSync(req.body.Password, salt);
//     console.log("hhhhh")
//     Judge1.Status="en attente";
//     Judge1.creationDate=new Date();
//     console.log("hhhhh")
//     Judge1.save(function (err, Judge) {
//         if (err) {
//             res.send(err)
//         }
//         else{
// //             var Demande1 = new Demande({
// //
// //                 Status:'en attente',
// //                 createdBy:Judge1.id
// //
// //             }) ;
// // Demande1.save();
// res.send(Judge1)
//           }
//     })
// });


router.post('/registerCandidat',function (req, res) {
    var salt = bcrypt.genSaltSync(10,10);
console.log(req.body)
    var candidat2= new Candidat({

        Password:bcrypt.hashSync(req.body.Password, salt),

        Email: req.body.Email,
        LastName:req.body.LastName,
        FirstName:req.body.FirstName,
        TypeLabel:"5cd4291b0330f4b9b02b738d",
        Status:"non Traitée"

    })
    candidat2.save();

});
router.put('/addCompte',function (req,res) {
    var salt = bcrypt.genSaltSync(10,10);

    var Judge1 = new Judge(req.body)
    Judge1.UserType='j';
    Judge1.password2=req.body.Password;
    Judge1.Password=bcrypt.hashSync(req.body.Password, salt);
Judge1.creationDate=Date.now();
Judge1.creationDate=Date.now();
    Judge1.Status="acceptée";
    Judge1.createdBy="5ca682c594b3478520c09158",
    Judge.find().exec(function (err,Judge2) {
        if (err)
            res.status(400).send(err);
        if (!Judge2)
            res.status(404).send();
        else
        {
            for(var i in Judge2){
                if(Judge2[i].Email===req.body.Email)
                {
                    Judge2[i].delete();
Judge1.save()

                }
            }
        }})
            //
            //  Judge.findByIdAndUpdate(id, Judge1, {new: true}, (err, Judge) => {
            //       console.log("updated");
            //
            //  });


});
//Rechercher Judge par son id
router.get('/find/:id', function (req, res) {

    var id = req.params.id;
    Judge.findById(id).exec(function (err,Judge1) {
        if (err)
            res.status(400).send(err);
        if (!Judge1)
            res.status(404).send();
        else
        {
           //  Judge1.Status='accepté';
           // Judge.findByIdAndUpdate(id, Judge1, {new: true}, (err, Judge) => {
           //      console.log("updated");
           //
           //  });
         //   bcrypt.compareSync(req.body.Password.toString(),Judge1.Password
res.send(Judge1)
        }


    });


});
router.put('/update/:id', function (req, res) {

    Judge.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, judge) => {
        if (err) {
            res.send(err);
        }
        else   /* i'm not sure if this is a usefull endpoit :) */
        {
           judge.save(
               res.send({done: true})
         )

        }

    }).catch(() => {
        res.send({done: false})
    });

});
router.put('/refuse/:id', function (req, res) {

    var id = req.params.id;
    Judge.findById(id).exec(function (err,Judge1) {
        if (err)
            res.status(400).send(err);
        if (!Judge1)
            res.status(404).send();
        else
        {
            Judge1.Status='refused';
            Judge.findByIdAndUpdate(id, Judge1, {new: true}, (err, Judge) => {
                console.log("updated");

            });
            res.send(Judge1)
        }


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
//effacer la demande et le juge
router.delete('/:id/:id1',function (req, res) {
    var id = req.params.id;
    var id1 = req.params.id1;
    Judge.findByIdAndRemove(id1, function (err, Judge1) {


        res.send({done: true})
    }).catch(() => {
        res.send({done: false})
    })
})


router.post('/login',function (req, res) {
    const Email = req.body.Email;
    const Password = req.body.Password;

    Judge.findOne({Email})
        .then(Judge => {

            bcrypt.compare(Password, Judge.Password)
                .then(isMatch => {
                    if(isMatch) {
                        console.log("jjj")
                        const payload = {
                            id: Judge._id,
                            name: Judge.FirstName,

                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }

                });
        });




    Judge.findOne({ Email: req.body.Email},function (err, Judge) {
        console.log(Judge.Password)
        console.log(req.body.Password)

        if (bcrypt.compareSync(req.body.Password.toString(),Judge.Password)) {
            console.log('user found', Judge);
            console.log("jjj")
            const payload = {
                id: Judge._id,
                name: Judge.FirstName,

            }
            jwt.sign(payload, 'secret', {
                expiresIn: 3600
            }, (err, token) => {
                if(err) console.error('There is some error in token', err);
                else {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    });
                }
            });
        } else {
            res.status(401).json('unauthorized');
        }
    });








});
router.post('/login2',function (req, res) {
    const Email = req.body.Email;
    const Password = req.body.Password;

    Charge.findOne({Email})
        .then(Charge => {

            bcrypt.compare(Password, Charge.Password)
                .then(isMatch => {
                    if(isMatch) {
                        console.log("jjj")
                        const payload = {
                            id: Charge._id,
                            name: Charge.FirstName,

                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }

                });
        });




    Charge.findOne({ Email: req.body.Email},function (err, Charge) {
        console.log(Charge.Password)
        console.log(req.body.Password)

        if (bcrypt.compareSync(req.body.Password.toString(),Charge.Password)) {
            console.log('user found', Charge);
            console.log("jjj")
            const payload = {
                id: Charge._id,
                name: Charge.FirstName,

            }
            jwt.sign(payload, 'secret', {
                expiresIn: 3600
            }, (err, token) => {
                if(err) console.error('There is some error in token', err);
                else {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    });
                }
            });
        } else {
            res.status(401).json('unauthorized');
        }
    });








});
router.post('/login3',function (req, res) {
    const Email = req.body.Email;
    const Password = req.body.Password;

    Candidat.findOne({Email})
        .then(Charge => {

            bcrypt.compare(Password, Candidat.Password)
                .then(isMatch => {
                    if(isMatch) {
                        console.log("jjj")
                        const payload = {
                            id: Candidat._id,
                            name: Candidat.FirstName,

                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }

                });
        });




    Candidat.findOne({ Email: req.body.Email},function (err, Candidat) {
        console.log(Charge.Password)
        console.log(req.body.Password)

        if (bcrypt.compareSync(req.body.Password.toString(),Candidat.Password)) {
            console.log('user found', Charge);
            console.log("jjj")
            const payload = {
                id: Candidat._id,
                name: Candidat.FirstName,

            }
            jwt.sign(payload, 'secret', {
                expiresIn: 3600
            }, (err, token) => {
                if(err) console.error('There is some error in token', err);
                else {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    });
                }
            });
        } else {
            res.status(401).json('unauthorized');
        }
    });








});
module.exports = router;
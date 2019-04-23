
var express = require('express');
var router = express.Router();
const Nexmo = require('nexmo');
const privateKey = require('fs').readFileSync(__dirname +"\\"+'private.key');

const nexmo = new Nexmo({
    apiKey: '6c4de09e',
    apiSecret: '0Qr6NuiURwaOxqMG',
    applicationId: '03b973dd-2e0a-404a-bc9d-473f160c95f1',
    privateKey: privateKey
});


var mongoose = require('mongoose');
require('../models/Review')


var Review=mongoose.model('Review');

var Project=require('../models/Project');




var Session= require('../models/Session');
var ReviewCharge=require('../models/ReviewCharge');
require("../models/User")
const candidat = mongoose.model('Candidat');
const Judge = mongoose.model('Judge');
const Charge= mongoose.model('Charge');

router.get('/:id', function (req, res) {
    Session.findById(req.params.id).populate({path:'Project.createdBy',populate: ({path:'TypeLabel'})}).populate({path:'Project.createdBy',populate: ({path:'review'})}).
    exec( function (err,Session){
        if (err)
            res.send(err)
        if (!Session)
            res.status(404).send();
        else {

res.send(Session)
        }
    });
});



//Calcul des projets votées
router.get('/projetsVotes', function (req, res) {
    var count=0;

    Project.find().populate({path:'createdBy'}).exec(function (err,Project1) {

        if (err)
            res.status(400).send(err);
        if (!Project1)
            res.status(404).send();
        else
        {

            for(var i in Project1){

                    if( Project1[i].createdBy.review2!=null)
                        count++;
                }



        }
        console.log(count);


    })





})

router.get('/:id/:id2/avisNegatif', function (req, res) {
    var count=0

    Session.findById(req.params.id).populate({path:'Project.createdBy',populate: ({path:'TypeLabel'})}).populate({path:'Project.createdBy',populate: ({path:'review'})})
        .exec( function (err,Session){
console.log(req.params.id2)

         for( var j=0; j< Session.Project.length;j++){

if(Session.Project[j]._id.equals(req.params.id2)){

    for(var i=0; i<Session.Project[j].createdBy.review2.length;i++) {

      if(Session.Project[j].createdBy.review2[i].type==="negatif"){
          count++

      }

    }
    res.json(count)
}

         }

    });



  }


);
router.get('/:id/:id2/avisPositif', function (req, res) {
        var count=0

        Session.findById(req.params.id).populate({path:'Project.createdBy',populate: ({path:'TypeLabel'})}).populate({path:'Project.createdBy',populate: ({path:'review'})})
            .exec( function (err,Session){
                console.log(req.params.id2)

                for( var j=0; j< Session.Project.length;j++){

                    if(Session.Project[j]._id.equals(req.params.id2)){

                        for(var i=0; i<Session.Project[j].createdBy.review2.length;i++) {

                            if(Session.Project[j].createdBy.review2[i].type==="positif"){
                                count=count+1;

                            }

                        }

                    }

                }

            }
            );



    }


);
//addAvisCharge
router.post('/:idCandidature/addAvis',function (req,res) {

    var charge1= new Charge({
        LastName:'akrout',
        FirstName:'atef',
        Email:'atef.akrout@esprit.tn',
        Password:'atoufa'
    }) ;
    //charge1.save();
    var avis=new ReviewCharge({
        text:'pas mal',
        type:'negatif',
        createdBy:charge1.id,
        candidat:req.params.idCandidature
    });

    avis.save();

    var id=req.params.idCandidature;
    candidat.findById(id).exec(function (err,candidat1) {
        candidat1.review = avis.id;
        candidat.findByIdAndUpdate(id, candidat1, {new: true}, (err, candidat) => {
            console.log("updated");

        });


    })

})

router.put('/:idJudge/:idCandidature/:numCandidature/call', function(req, res) {
    console.log("jjjjjj")
    const Review=mongoose.model('Review')
    console.log(req.body.text);
    reviewJudge1=new Review(req.body)
    reviewJudge1.createdBy=req.params.idJudge;
    reviewJudge1.candidat=req.params.idCandidature;

    reviewJudge1.save();

    candidat.findById(req.params.idCandidature).exec(function (err,candidat1) {
        candidat1.review2.push(reviewJudge1);
        candidat1.Status= "Traité";
        candidat1.etat="accepted";
        candidat1.countPositif+=1
        candidat.findByIdAndUpdate(req.params.idCandidature, candidat1, {new: true}, (err, candidat) => {
            res.send(candidat.review2)

        });

    });
    Judge.findById(req.params.idJudge).exec(function (err,Judge1) {
        Judge1.nbredeVotes+=1;


        Judge.findByIdAndUpdate(req.params.idJudge, Judge1, {new: true}, (err, Judge) => {
            res.send(Judge.LastName)

        });

    });

const num="216"+req.params.numCandidature;

        nexmo.calls.create({

        to: [{
            type: 'phone',
            number:+num // take a phone number from command line argument
        }],
        from: {
            type: 'phone',
            number: +num // your virtual number
        },
        answer_url: ['https://nexmo-community.github.io/ncco-examples/first_call_talk.json']

        }, (err, res) =>{
    if(err) { console.error(err); }
    else { console.log(res); }}
)

})
// router.post('/callHaifa', function(request, response) {
//
//     nexmo.message.sendSms(
//         +21658011658, 21658011658, 'yo',
//         (err, responseData) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.dir(responseData);
//             }
//         }
//     );
//
// })
//nombre de juges qui ont voté
router.get('/:id/nombreJudges', function (req, res) {
    list=[]
    var count=0;

    Review.find().exec( function (err, Review){
        for(var j in Review){
            list.push(Review[j])}
    });
    Project.findById(req.params.id).exec(function (err,Project1) {
        console.log("hhh")
        for(var i in list){

            if( list[i].candidat.equals(Project1.createdBy)){
                count++
            }
        }

        res.send("nombre de juges "+count)

    });





})
//Nombre de votes qui ont voté négativement
router.get('/votes/:id/avisNegatif', function (req, res) {
        list=[]
        var count=0;

        Review.find().exec( function (err, Review){
            for(var j in Review){
                list.push(Review[j])}
        });
        Project.findById(req.params.id).exec(function (err,Project1) {
            console.log(Project.createdBy.FirstName)
            for(var j in Project.createdBy.review2){

                            if(Project1.createdBy.review2[j].type==="negatif") {
                                console.log("jjjj")
                                count+=1;
                                list.push(Project1.createdBy.review2)
                            }



                        }
            res.send("nombre d'avis negatifs "+count)

        });



        // Project.findById(req.params.id).exec(function (err,Project) {
        //     cosnole.log('hhh')
        //     if (err)
        //         res.status(400).send(err);
        //     if (!Session)
        //         res.status(404).send();
        //     else
        //     {
        //
        //
        //
        //
        //         for(var j in Project.createdBy.review2){
        //             console.log(roject.createdBy.review2[j].type)
        //             if(Project.createdBy.review2[j].type==="negatif") {
        //                 console.log("jjjj")
        //                 count+=1;
        //                 list.push(Project.createdBy.review2)
        //             }
        //
        //
        //
        //         }
        //         res.send("nombre d'avis negatifs "+count)
        //
        //
        //     }
        //
        // });



}
);

//Nombre de votes qui ont voté négativement
router.get('/votes/:id/avisPositif', function (req, res) {
        list=[]
        var count=0;

        Review.find().exec( function (err, Review){
            for(var j in Review){
                list.push(Review[j])}
        });
        Project.findById(req.params.id).exec(function (err,Project1) {
            console.log(Project.createdBy.FirstName)
            for(var j in Project.createdBy.review2){

                if(Project1.createdBy.review2[j].type==="positif") {
                    console.log("jjjj")
                    count+=1;
                    list.push(Project1.createdBy.review2)
                }



            }
            res.send("nombre d'avis negatifs "+count)

        });



        // Project.findById(req.params.id).exec(function (err,Project) {
        //     cosnole.log('hhh')
        //     if (err)
        //         res.status(400).send(err);
        //     if (!Session)
        //         res.status(404).send();
        //     else
        //     {
        //
        //
        //
        //
        //         for(var j in Project.createdBy.review2){
        //             console.log(roject.createdBy.review2[j].type)
        //             if(Project.createdBy.review2[j].type==="negatif") {
        //                 console.log("jjjj")
        //                 count+=1;
        //                 list.push(Project.createdBy.review2)
        //             }
        //
        //
        //
        //         }
        //         res.send("nombre d'avis negatifs "+count)
        //
        //
        //     }
        //
        // });



    }
);
router.post('/:idCandidature/addQuestion', function (req, res) {


    var id = req.params.idCandidature;
   // require('../models/Questionnaire');
   // var Questionnaire = mongoose.model('Questionnaire');
    require('../models/Response');
    var Response = mongoose.model('Response');
    console.log("haifa")
    // var question = new Questionnaire({
    //     text:req.body.text,
    //     type:req.body.type
    // });
    var response = new Response({
        text:"oui",
        type:"candidature"
    });
    console.log("haifa")
    candidat.findById(id).exec(function (err , candidat1) {
        candidat1.Questions[0].responses.push(response)
        candidat.findByIdAndUpdate(id, candidat1, {new: true}, (err, candidat2) => {
            console.log("updated");

         });



    });

});



module.exports = router;
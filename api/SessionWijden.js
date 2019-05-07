var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Session= require('../models/Session');





/*getAllSessions*/
router.get('/getSession', function (req, res) {
    Session.find().exec( function (err,Session){
        if (err)
            res.send(err)
        if (!Session)
            res.status(404).send();
        else {
            res.json(Session);
            console.log(Session)
        }
    });
});




/*addSession */
router.post('/addSession',function (req,res,next) {

    var sessionn = new Session();

    sessionn.Name=req.body.Name;
    sessionn.Status=req.body.Status;
    sessionn.StartDate=req.body.StartDate;
    sessionn.EndDate=req.body.EndDate;
    sessionn.Comment=req.body.Comment;



    sessionn.save(function (err,session) {
        if(err){
            res.send(err)
        }
        else{
            res.send(session)
        }
    });
    console.log(sessionn)
});
/*FindById*/
router.get('/getSessionById/:id', function(req, res, next) {

    Session.findById(req.params.id).exec(function (err, sess) {

        if (err){
            res.json(err);
        }else {
            res.json(sess);
        }  });

});

/*delete*/
router.delete('/del/:id',function (req, res) {
    var id = req.params.id;
    Session.findByIdAndRemove(id , function (err, todo) {
        if (err)
            res.send(err);
        else
            res.send('Session deleted');
    })
})
/*Update*/
router.post('/update/:id',function(req,res){
    Session.findOneAndUpdate(
        {_id : req.params.id
        },
        {   Name: req.body.Name,
            Status: req.body.Status,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Comment: req.body.Comment,
        },
        {  new : true
        }).then( session =>{ res.json(session);} );

})
/*findByDate*/
router.get('/getSessionByDate/:Date', function(req, res, next) {

    Session.findOne({"StartDate":req.params.Date }).exec(function (err, sess) {

        if (err){
            res.json(err);
        }else {
            res.json(sess);
        }  });

});
/*UpdateStatus*/
router.post('/UpdateStatus/:Date',function(req,res){
    var Date =
        Session.findOneAndUpdate(
            {"StartDate" : req.params.Date },
            console.log(StartDate < Date.now()),
            {   Name: req.body.Name,
                Status: req.body.Status,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                Comment: req.body.Comment,
            },
            {  new : true
            }).then( session =>{ res.json(session);} );

})

module.exports = router;

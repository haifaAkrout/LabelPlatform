var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Session= require('../models/Session');
router.get('/', function (req, res) {
    Session.find().exec( function (err,Session){
        if (err)
            res.send(err)
        if (!Session)
            res.status(404).send();
        else {
            res.json(Session);

        }
    });
});
router.post('/add',function (req,res) {

    var session1 = new Session({
        Name: 'hhh' ,
        Status:'hhh' ,
        StartDate: '1996-07-02',
        EndDate: '1996-07-02'
    }) ;


    session1.save(function (err,session) {
        if(err){
            res.send(err)
        }
        else{
      res.send(session)
        }
    })
})
module.exports = router;
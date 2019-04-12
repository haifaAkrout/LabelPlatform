const express = require('express');
const router = express.Router();
const bodyParser=require('body-parser');
var mongoose = require('mongoose');
var Session= require('../models/Session');
var Vote = require('../models/Vote');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '749428',
    key: '5a4108a6afaa12b66d4e',
    secret: '151930cdb97612994b70',
    cluster: 'eu',
    encrypted: true
});

router.get('/vote', function (req, res) {
    console.log('jjjj')
    Session.findById("5ca5ebc04b6813641c770b1f").populate({path:'Project.createdBy',populate: ({path:'TypeLabel'})}).populate({path:'Project.createdBy',populate: ({path:'review'})}).
    exec( function (err,Session){
        if (err)
            res.send(err)
        if (!Session)
            res.status(404).send();
        else {
            res.render('Judges/poll.twig',{Sessions:Session})

        }
    });
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({success: true, votes: votes}));
});

router.post('/', (req, res) => {
    var newVote =new Vote( {
        project: req.body.project,
        points: '1'
    })

   newVote.save(function (err, vote) {
        pusher.trigger('project-poll', 'project-vote', {
            points: parseInt(vote.points),
            smartphone: vote.smartphone

        });

       return res.json({success: true, message: 'Thank you for voting'});
    });
});

module.exports = router;
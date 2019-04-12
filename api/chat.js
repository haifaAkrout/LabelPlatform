var express = require('express');
var app = express();

var bodyParser = require('body-parser')
var router = express.Router();
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Message= require('../models/chat');
io.on('connection', () =>{
    console.log('a user is connected')
})
router.get('/mes', (req, res) => {

  res.render("Judges/Chat.twig")
})
router.get('/messages', (req, res) => {

    Message.find({},(err, messages)=> {
        res.send(messages);
    })

})

router.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
        if(err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

module.exports = router;
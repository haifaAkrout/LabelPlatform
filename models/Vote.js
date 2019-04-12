var mongoose = require('mongoose');

var Judge = require('../models/User')
var project= require('../models/Project');
var VoteSchema = new mongoose.Schema(
    {

        //smartphone:{type: String,required: true},
        project:{ type: String},
        points:{type: String,required: true},
        //createdBy:{ type: mongoose.Schema.ObjectId, ref: 'Judge' }
    }
)
module.exports=mongoose.model('Vote',VoteSchema)

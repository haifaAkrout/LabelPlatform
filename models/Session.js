var mongoose = require('mongoose');
var Project = require('../models/Project');
var SessionSchema = new mongoose.Schema(
    {

        Name:{type:String,required:true},
        Status:{type:String},
        Project:[Project],
        StartDate:{type:Date,required:true},
        EndDate:{type:Date,required:true},
            Comment:{type:String}


    }
)
module.exports=mongoose.model('Session',SessionSchema)
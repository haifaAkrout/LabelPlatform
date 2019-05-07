var mongoose = require('mongoose');
var Member = require('../models/User');
var Candidat = require('../models/User');

var questionnaire = require('../models/Questionnaire');
var ProjectSchema = new mongoose.Schema(
    {
        Name :{ type: String, required: true },
        members:[Member],
        Question1:{type:String},
        Reponse1:{type:String},
        Question2:{type:String},
        Reponse2:{type:String},
        Question3:{type:String},
        Reponse3:{type:String},
       // questionnaire:[questionnaire],
        createdBy:{ type: mongoose.Schema.ObjectId, ref: 'Candidat' },

    }
)

//mongoose.model( 'Project',ProjectSchema)
module.exports=ProjectSchema
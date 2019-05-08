var mongoose = require('mongoose');
var Member = require('../models/User');
var Candidat = require('../models/User');

var questionnaire = require('../models/Questionnaire');
var ProjectSchema = new mongoose.Schema(
    {
        Name :{ type: String, required: true },
        members:[Member],

        Reponse1:{type:String},

        Reponse2:{type:String},

       // questionnaire:[questionnaire],
        createdBy:{ type: mongoose.Schema.ObjectId, ref: 'Candidat' },

    }
)

//mongoose.model( 'Project',ProjectSchema)
module.exports=ProjectSchema
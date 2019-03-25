var mongoose = require('mongoose');
var Member = require('../models/User');
var Candidat = require('../models/User');
var questionnaire = require('../models/Questionnaire');
var ProjectSchema = new mongoose.Schema(
    {
        Name :{ type: String, required: true },
        members:[Member],
        questionnaire:[questionnaire],
        createdBy:{ type: mongoose.Schema.ObjectId, ref: 'Candidat' }
    }
)
module.exports = ProjectSchema;

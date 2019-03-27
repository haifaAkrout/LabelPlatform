var mongoose = require('mongoose')
var response = require('../models/Response');
var QuestionnaireSchema = new mongoose.Schema(
    {
        text:{type:String,required:true},
        type:{type:String,required:true},
        responses:[response]


    }
)

mongoose.model('Questionnaire',QuestionnaireSchema)
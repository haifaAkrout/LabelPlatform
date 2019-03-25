var mongoose = require('mongoose');
var avantages = require('../models/Advantage');
var LabelSchema = new mongoose.Schema(
    {


        type:{type:String,required:true,enum:['label','PreLabel']},
        SoumissionDate:{type:Date,required:true},
        PreLabelDate:{type:Date,required:true}


    }
)
module.exports = LabelSchema;
var mongoose = require('mongoose');
var avantages = require('../models/Advantage');
var LabelSchema = new mongoose.Schema(
    {


        type:{type:String},
        SoumissionDate:{type:Date},
        PreLabelDate:{type:Date}


    }
)

module.exports=mongoose.model('Label',LabelSchema)

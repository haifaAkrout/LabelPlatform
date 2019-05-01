var mongoose = require('mongoose')
var  Charge=require('../models/User');
var  Candidat=require('../models/User');

var ReviewChargeSchema= new mongoose.Schema(
    {
        text :{ type: String },
        candidat:{ type: mongoose.Schema.ObjectId, ref: 'Candidat' },
        estValide:{type:Boolean},
        cause:{type:String},
    }
)
module.exports=mongoose.model('ReviewCharge',ReviewChargeSchema)

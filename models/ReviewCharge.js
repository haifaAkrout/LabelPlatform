var mongoose = require('mongoose')
var  Charge=require('../models/User');
var  Candidat=require('../models/User');

var ReviewChargeSchema= new mongoose.Schema(
    {
        text :{ type: String, required: true },
        type:{ type: String, required: true },
        createdBy:{ type: mongoose.Schema.ObjectId, ref: 'Charge' },
        candidat:{ type: mongoose.Schema.ObjectId, ref: 'Candidat' }
    }
)
module.exports=mongoose.model('ReviewCharge',ReviewChargeSchema)

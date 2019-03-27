var mongoose = require('mongoose')
var  Judge=require('../models/User');
var  Candidature=require('../models/User');

var ReviewSchema = new mongoose.Schema(
    {
        text :{ type: String, required: true },
        type:{ type: String, required: true },
        createdBy:{ type: mongoose.Schema.ObjectId, ref: 'Judge' },
        candidat:{ type: mongoose.Schema.ObjectId, ref: 'Candidature' }
    }
)
module.exports = ReviewSchema;

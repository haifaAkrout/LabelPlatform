var mongoose = require('mongoose')
require("../models/User")
const judge=mongoose.model("Judge")
var ReponseSchema = new mongoose.Schema(
    {

        text:{type:String,required:true},
        verify:{type:Boolean},
        createdBy:{ type: mongoose.Schema.ObjectId, ref: 'judge' }

    }
)

module.exports=ReponseSchema
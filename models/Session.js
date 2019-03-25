var mongoose = require('mongoose')
var SessionSchema = new mongoose.Schema(
    {

        Name:{type:String,required:true},
        Status:{type:String,required:true},

        StartDate:{type:Date,required:true},
        EndDate:{type:Date,required:true}


    }
)
module.exports=mongoose.model('Session',SessionSchema)
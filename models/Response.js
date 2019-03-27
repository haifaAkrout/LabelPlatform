var mongoose = require('mongoose')
var ReponseSchema = new mongoose.Schema(
    {

        text:{type:String,required:true},
        verify:{type:Boolean,required:true},

    }
)

mongoose.model('Response',ReponseSchema)
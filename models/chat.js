var mongoose = require('mongoose')
var MessageSchema = new mongoose.Schema(
    {

        Message:{type:String}


    }
)
module.exports=mongoose.model('Message',MessageSchema);
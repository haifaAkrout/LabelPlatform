var mongoose = require('mongoose')
var LinkSchema = new mongoose.Schema(
    {

        type:{type:String,enum:['Fb','Instagram','Twitter','LinkedIn']}


    }
)

mongoose.model('Link',LinkSchema)

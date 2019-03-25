var mongoose = require('mongoose')
var AdvantageSchema = new mongoose.Schema(
    {

        type:{type:String,required:true},
        state:{type:String,required:true}



    }
)
module.exports = AdvantageSchema;
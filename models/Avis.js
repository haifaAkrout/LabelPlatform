var mongoose = require('mongoose');


var AvisSchema = new mongoose.Schema(
    {

        //smartphone:{type: String,required: true},
        cause:{ type: String},
        commentaire:{type: String},
        date:{type:Date}
    }
)
module.exports=mongoose.model('avis',AvisSchema)
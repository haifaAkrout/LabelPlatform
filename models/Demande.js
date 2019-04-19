var mongoose = require('mongoose');
//const user = mongoose.model('User');
var DemandeSchema = new mongoose.Schema(
    {
        Status :{ type: String, required: true },
        //createdBy:{ type: mongoose.Schema.ObjectId, ref: 'user' }

    }
)
module.exports=mongoose.model('Demande',DemandeSchema);
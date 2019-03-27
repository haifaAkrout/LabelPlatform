var mongoose = require('mongoose');
const Judge = mongoose.model('Judge');
var DemandeSchema = new mongoose.Schema(
    {
        Status :{ type: String, required: true },
        createdBy:{ type: mongoose.Schema.ObjectId, ref: 'Judge' }

    }
)
module.exports=mongoose.model('Demande',DemandeSchema);
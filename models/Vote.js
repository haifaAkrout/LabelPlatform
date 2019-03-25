var mongoose = require('mongoose')
var VoteSchema = new mongoose.Schema(
    {
        vote :{ type: Number , required: true }

    }
)
module.exports = VoteSchema;

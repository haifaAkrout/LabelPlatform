var mongoose = require('mongoose')
var ReviewSchema = new mongoose.Schema(
    {
        text :{ type: String, required: true },
        type:{ type: String, required: true }

    }
)
module.exports = ReviewSchema;

var mongoose = require('mongoose')
var EducationSchema = new mongoose.Schema(
    {

        School:{type:String,required:true},
        Degree:{type:String,required:true},
        FieldOfStudies:{type:String,required:true},
        Description:{type:String,required:true},
        StartDate:{type:Date,required:true},
        EndDate:{type:Date,required:true}


    }
)
module.exports = EducationSchema;
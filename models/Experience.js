var mongoose = require('mongoose')
var ExperienceSchema = new mongoose.Schema(
    {

            Title:{type:String,required:true},
            Company:{type:String,required:true},
            Location:{type:String,required:true},
            Description:{type:String,required:true},
            StartDate:{type:Date,required:true},
            EndDate:{type:Date,required:true},
            currentlyWork:{type:Boolean}


    }
)

mongoose.model('Experience',ExperienceSchema)
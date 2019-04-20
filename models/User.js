var mongoose=require('mongoose'),
    extend=require('mongoose-extend-schema');
var valid=require('validator');
var vote = require('../models/Vote');
var questions = require('../models/Questionnaire');
var ReviewCharge=require('../models/ReviewCharge');

var Review=require('../models/Review')
var project= require('../models/Project');
var education = require('../models/Education');
var experience = require('../models/Experience');
var Label= require('../models/Label');

var link= require('../models/Link');
var userSchema=new mongoose.Schema({
    LastName:{type:String,required:true},
    FirstName:{type:String,required:true},
    Email:{type:String,required:true,trim:true,minlength:1,unique:true,
        validate:{
            validator:valid.isEmail,
            message:'{VALUE}is not a valid email'
        }},
    Password:{type:String},
   // Status:{type:String,required:true}
})
var adminSchema=extend(userSchema,{})
var judgeSchema=extend(userSchema,{
    Status:{type:String},
    creationDate:{type:Date},
    Telephone:{type:Number},
    YearsOfExperience:{type:Number},
    Spécialité:{type:String},
    createdBy:{ type: mongoose.Schema.ObjectId, ref: 'adminSchema' }


})
var chargeSchema=extend(userSchema,{
   
    createdBy:{ type: mongoose.Schema.ObjectId, ref: 'adminSchema' }

})
var teamMemberSchema=extend(userSchema,{
    Role:{type:String,required:true},
    Bio:{type:String},
    Description:{type:String},
    image:{type:String},
    Cin:{type:String},
    Education: [education],
    Experience: [experience],
    Link: [link]

})


var candidatureSchema=extend(userSchema,{
    TypeLabel:   { type: mongoose.Schema.ObjectId, ref: 'Label' },
    review:{ type: mongoose.Schema.ObjectId, ref: 'ReviewCharge' },
    review2:[Review],
    Status: {type:String},
    Questions:[questions],
    etat:{type:String},
    phone:{type:Number}
})

module.exports=mongoose.model('Admin',adminSchema)
module.exports=mongoose.model('Candidat',candidatureSchema)
module.exports=mongoose.model('Judge',judgeSchema)
module.exports=mongoose.model('Charge',chargeSchema)
module.exports=mongoose.model('Member',teamMemberSchema)

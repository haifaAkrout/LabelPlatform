var mongoose=require('mongoose'),
    extend=require('mongoose-extend-schema');
var valid=require('validator');
var vote = require('../models/Vote');
var review = require('../models/Review');
var project= require('../models/Project');
var education = require('../models/Education');
var experience = require('../models/Experience');
var link= require('../models/Link');
var userSchema=new mongoose.Schema({
    LastName:{type:String,required:true},
    FirstName:{type:String,required:true},
    Email:{type:String,required:true,trim:true,minlength:1,unique:true,
        validate:{
            validator:valid.isEmail,
            message:'{VALUE}is not a valid email'
        }},
    Password:{type:String,required:true},
   // Status:{type:String,required:true}
})
var adminSchema=extend(userSchema,{})
var judgeSchema=extend(userSchema,{
    Status:{type:String,required:true},
    Votes: [vote],
    Reviews: [review],
    createdBy:{ type: mongoose.Schema.ObjectId, ref: 'adminSchema' }


})
var chargeSchema=extend(userSchema,{
    Votes: [vote],
    Reviews: [review],
    createdBy:{ type: mongoose.Schema.ObjectId, ref: 'adminSchema' }

})
var teamMemberSchema=extend(userSchema,{
    Role:{type:String,required:true},
    Bio:{type:String,required:true},
    Description:{type:String,required:true},
    image:{type:String,required:true},
    Cin:{type:String,required:true},
    Education: [education],
    Experience: [experience],
    Link: [link]

})
var candidatureSchema=extend(userSchema,{
    tester:{type:String}
})
module.exports=mongoose.model('User',userSchema)
module.exports=mongoose.model('Admin',adminSchema)
module.exports=mongoose.model('Candidat',candidatureSchema)
module.exports=mongoose.model('Judge',judgeSchema)
module.exports=mongoose.model('Charge',chargeSchema)
module.exports=mongoose.model('Member',teamMemberSchema)
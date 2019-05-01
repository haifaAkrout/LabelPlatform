var mongoose = require('mongoose'),
    extend = require('mongoose-extend-schema');
var valid = require('validator');
var vote = require('../models/Vote');
var questions = require('../models/Questionnaire');
var ReviewCharge = require('../models/ReviewCharge');
var bcrypt = require('bcrypt-nodejs');
var Review = require('../models/Review')
var project = require('../models/Project');
var education = require('../models/Education');
var experience = require('../models/Experience');
var Label = require('../models/Label');
var link = require('../models/Link');
var userSchema = new mongoose.Schema({
    LastName: {
        type: String,
        //required: true
    },
    FirstName: {
        type: String,
        //required: true
    },
    Email: {
        type: String,
        //required: true,
    },
    created_at: {
        type: Date
    },
    Password: {
        type: String
    },
    // Status:{type:String,required:true}
})
var adminSchema = extend(userSchema, {})
var judgeSchema = extend(userSchema, {
    Status: {
        type: String
    },
    creationDate: {
        type: Date
    },
    Telephone: {
        type: Number
    },
    YearsOfExperience: {
        type: Number
    },
    Spécialité: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'adminSchema'
    },
    nbredeVotes: {
        type: Number
    },
    password2: {
        type: String
    }
})
var chargeSchema=extend(userSchema,{

    createdBy:{ type: mongoose.Schema.ObjectId, ref: 'adminSchema' },
    Status:{type:String},
    review:{ type: mongoose.Schema.ObjectId, ref: 'ReviewCharge' },
    avis:{ type: mongoose.Schema.ObjectId, ref: 'Avis' },

});
var teamMemberSchema=extend(userSchema,{
    Role:{type:String},
    Bio:{type:String},
    Description:{type:String},
    image:{type:String},
    Cin:{type:String},
    LinkLinkedIn:{type:String},
    LinkFacebook:{type:String},
    Education: [education],
    Experience: [experience],

});
var candidatureSchema = extend(userSchema, {
    TypeLabel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Label'
    },
    // review: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'ReviewCharge'
    // },
    review2: [Review],
    Status: {
        type: String
    },
    Questions: [questions],
    etat: {
        type: String
    },
    phone: {
        type: Number
    },
    countPositif: {
        type: Number,
        default: 0
    },
    countNegatif: {
        type: Number,
        default: 0
    },
    charges:{
        type: mongoose.Schema.ObjectId,
        ref: 'Charge' },

})


// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {

    if (this.Password)
        return bcrypt.compareSync(password, this.Password);
    else
        return false
};



userSchema.pre('save', function(next) {

    if (!this.created_at) {
        this.created_at = new Date();
    }
    next();
});

module.exports = mongoose.model('Admin', adminSchema)
module.exports = mongoose.model('Candidat', candidatureSchema)
module.exports = mongoose.model('Judge', judgeSchema)
module.exports = mongoose.model('Charge', chargeSchema)
module.exports = mongoose.model('Member', teamMemberSchema)
module.exports = mongoose.model('User', userSchema)
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const router = express.Router();

require('../models/Link');
const Link = mongoose.model('Link');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//import model
require('../models/User');
const Membre = mongoose.model('Member');




//getAll request membre
router.get('/',(req,res)=>{
    Membre.find()
        .then(membres => {
            res.json({
                status: "success",
                message: "members retrieved successfully",
                data: membres
            });
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
});


//GETByid /membres/:id
//find findOne findById
router.get('/:id',function (req,res) {
    var id = req.params.id;
    Membre.findById(id)
        .then(members => {
            if(!members) {
                return res.status(404).send({
                    message: "Member not found with id " + id
                });
            }
            res.json({
                message:' membres details are loading',
                data:members
            });

        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Mmeber not found with id " + id
                });
            }
            return res.status(500).send({
                message: "Error retrieving member with id " + id
            });
        });



});

//POST/membres
router.post('/addMember',upload.single('image'),function (req,res) {
    console.log("ajout membre");

    const MemberUSer = mongoose.model('Member');

    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Member content can not be empty"
        });
    }

    console.log(req.file.path);
    console.log('image to text')
    var Tesseract = require('tesseract.js')
    //image = require('path').resolve(__dirname , '../'+req.file.path);
    Tesseract.recognize(req.file.path)
        .then(function (result) {


            var str = result.text;
            console.log( str)
            var letterNumber = /[0-9]{8}/ ;

            var found = result.text.match(letterNumber);

            var cin = "";
            console.log(found.toString())
            console.log(found.toString().length)
            if(found.toString().length == 8)
            {
                console.log("cin correcte")
                //ajouter member
                var UserMem = new MemberUSer({
                    LastName: req.body.LastName,
                    FirstName: req.body.LastName,
                    Email: req.body.Email,
                    Password:req.body.Password,
                    Role: req.body.Role,
                    Bio: req.body.Bio,
                    Description:req.body.Description,
                    image: req.file.path,
                    Cin: found.toString()
                });

                UserMem.save() .then(members => {
                    res.send({
                        message:'member add successfully',
                        data:members
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });});


            }
            else
            {
                console.log("cin incorrecte")
            }




        }).catch()





});


//DELETE supprimer membre et ses subdoc
router.delete('/deleteMember/:id',function (req,res) {
    //yfasakh el membres kahaw normlmn yfasakh  el education wel experiences
    var idMembre = req.params.id;
    Membre.findById(idMembre)
        .then(members => {
            if(!members) {
                return res.status(404).send({
                    message: "Member not found with id " + id
                });
            }

            //suppression des experiences
            require('../models/Experience');
            const ExperienceRemove = mongoose.model('Experience');
            for (var i = 0; i < members.Experience.length; i++)
            {
                console.log(members.Experience[i]._id)
                ExperienceRemove.findByIdAndRemove(members.Experience[i]._id).exec();
            }

            //suppression des experiences
            require('../models/Education');
            const EducationRemove = mongoose.model('Education');
            for (var i = 0; i < members.Education.length; i++)
            {
                console.log(members.Education[i]._id)
                EducationRemove.findByIdAndRemove(members.Education[i]._id).exec();
            }

            //suppression des links
            require('../models/Link');
            const LinkRemove = mongoose.model('Link');
            for (var i = 0; i < members.Link.length; i++)
            {
                console.log(members.Link.length)
                console.log(members.Link[i]._id)
                LinkRemove.findByIdAndRemove(members.Link[i]._id).exec();
            }


            res.json('deleted')
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Member not found with id " + id
            });
        }
    });
    Membre.findByIdAndRemove(idMembre).then(res.send('member deleted')).catch();

});


//put member findByIdAndRemove
router.put('/editMember/:id',upload.single('image'),(req,res)=>{
    console.log("updated member")
    var idMember = req.params.id;
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Member content can not be empty"
        });
    }

    Membre.findById(idMember).exec(function (err,member1) {
        if (err)
            res.status(400).send(err);
        if (!member1)
            res.status(404).send();
        else
        {

            Membre.findByIdAndUpdate(idMember, req.body, {new: true}, (err, membre) => {
                console.log("updated member ");
            });
            res.send(member1)
        }


    });


});

//affecter education a un membre
router.post('/add/:idMember',(req,res)=>{

    console.log("affecter education et experiences")
    var idM = req.params.idMember;


    Membre.findById(idM).exec(function (err , Membre,next) {


        require('../models/Education');
        const EducationModel = mongoose.model('Education');
        var educationn = new EducationModel({
            School:"ULT",
            Degree:"hell",
            FieldOfStudies:"sport",
            Description:"",
            StartDate:Date.now(),
            EndDate:Date.now()
        })
        educationn.save();

        var educationn2 = new EducationModel({
            School:"MSB",
            Degree:"hell",
            FieldOfStudies:"sport",
            Description:"",
            StartDate:Date.now(),
            EndDate:Date.now()
        })
        educationn2.save();
        //ajout link
        var LinkFacebook = new Link({
            type: "LinkFacebook"

        });
        var LinkTwiter = new Link({
            type: "LinkTwiter"
        });
        var LinkGoogle = new Link({
            type: "LinkGoogle"

        });
        var LinkLinkedIn = new Link({
            type: "LinkLinkedIn"

        });
        LinkFacebook.save();
        LinkGoogle.save();
        LinkTwiter.save();
        LinkLinkedIn.save();

        //affecter experience
        require('../models/Experience');
        const Experience = mongoose.model('Experience');
        var Experience1 = new Experience({
            Title:"experi1",
            Company:"Esprit",
            Location:"Tunis",
            Description:"Desss",
            StartDate:Date.now(),
            EndDate:Date.now(),
            currentlyWork:true
        })
        Experience1.save();


        Membre.Education.push(educationn);
        Membre.Education.push(educationn2);
        Membre.Experience.push(Experience1);
        Membre.Link.push(LinkLinkedIn);
        Membre.Link.push(LinkFacebook);
        Membre.Link.push(LinkGoogle);
        Membre.Link.push(LinkTwiter);
        Membre.save().then(members => {
            res.send({
                message:'affect member successfully',
                data:members
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });});

    });



});


//definir le membre en tant que lead
router.put('/leader/:id',(req,res)=>{
    var idMember = req.params.id;
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Member content can not be empty"
        });
    }

    Membre.findById(idMember).exec(function (err,member1) {
        if (err)
            res.status(400).send(err);
        if (!member1)
            res.status(404).send();
        else
        {
            member1.Role='lead';
            Membre.findByIdAndUpdate(idMember, member1, {new: true}, (err, membre) => {
                console.log("updated member as a leader");
                res.status(400).send({
                    message: "updated member as a leader"
                });
            });

        }


    });



});


// Export API routes
module.exports = router;
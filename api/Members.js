const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');

//const upload = multer({dest:'uploads/'})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname);
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
            /* res.json({
                 status: "success",
                 message: "members retrieved successfully",
                 data: membres
             });*/
            res.render('members.twig')
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
            /* res.json({
                 message:' membres details are loading',
                 data:members
             });*/
            res.redirect('members.twig')
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
router.post('/',upload.single('image'),function (req,res,next) {
    console.log(req.file);
    const membre = new Membre({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Role: req.body.Role,
        Bio: req.body.Bio,
        image: req.body.file,
        Cin: req.body.Cin,
        Description:[req.body.Description],
        Education:[req.body.Education] ,
        Experience: [req.body.Experience] ,
        Link: [req.body.Link]
    });

    // Save Member in the database
    membre.save()
        .then(data => {
            res.send({
                message:'member add successfully',
                data:data
            });
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Member."
        });
    });
});


//DELETE findById and remove
router.delete('/:id',function (req,res) {
    var id = req.params.id;
    Membre.findByIdAndRemove(id)
        .then(members => {
            if(!members) {
                return res.status(404).send({
                    message: "Note not found with id " + id
                });
            }
            res.send({message: "Member deleted successfully!",data:members});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Member not found with id " + id
            });
        }

    });


});


//put member findByIdAndRemove
router.put('/:id',(req,res)=>{
    var id = req.params.id;
    // Validate Request
    /* if(!req.body.content) {
         return res.status(400).send({
             message: "Note content can not be empty"
         });
     }*/

    // Find note and update it with the request body
    Membre.findByIdAndUpdate(id, {
        name:req.body.name,
        role:req.body.role,
        bio:req.body.bio,
        cin:req.body.cin
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Member not found with id " + id
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Member not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error updating member with id " + id
        });
    });
});


// Export API routes
module.exports = router;
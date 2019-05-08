const express = require('express');
const mongoose = require('mongoose');
var Session = require('../models/Session');
const configFile = require('../config');
var scrap = require('../scrapping/index');
const router = express.Router();

const config = {
    email: process.env.SCRAPEDIN_EMAIL || configFile.email,
    password: process.env.SCRAPEDIN_PASSWORD || configFile.password,
    relatedProfilesKeywords: configFile.relatedProfilesKeywords,
    maxConcurrentCrawlers: configFile.maxConcurrentCrawlers,
    hasToLog: configFile.hasToLog,
    rootProfiles: configFile.rootProfiles,
    isHeadless: false,
    user: '',
    idUser: ''

}

require('../models/Link');
const Link = mongoose.model('Link');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
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
router.get('/', (req, res) => {
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
router.get('/findById/:id', function (req, res) {
    var id = req.params.id;
    Membre.findById(id)
        .then(members => {
            if (!members) {
                return res.status(404).send({
                    message: "Member not found with id " + id
                });
            }
            res.json({
                message: ' membres details are loading',
                data: members
            });

        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Mmeber not found with id " + id
                });
            }
            return res.status(500).send({
                message: "Error retrieving member with id " + id
            });
        });


});


//DELETE supprimer membre et ses subdoc
//supprimer membre par id projet w membre w session
router.get('/deleteMember/:idSession/:idProjet/:idMember', function (req, res) {
    console.log('liste des membres dun projet');

    var idS = req.params.idSession;
    console.log(idS)
    var idP = req.params.idProjet;
    console.log(idP)
    var idM = req.params.idMember;
    console.log(idM)
    Session.findById(idS).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {

            for (var i = 0; i < sessions.Project.length; i++) {
                console.log(sessions.Project[i]._id)
                console.log("id projet")
                console.log(idP)
                if (sessions.Project[i]._id == idP) {
                    // res.json({
                    //         data:  sessions.Project[i],
                    //         NomSession:  sessions.Name,
                    //         DateDebutSession:sessions.StartDate,
                    //         idSessionBack:sessions._id
                    //     }
                    // )
                    console.log(sessions.Project[i].members.length)
                    var listeMembres = []
                    listeMembres = sessions.Project[i].members;
                    console.log(listeMembres)

                    for (var j = 0; j < listeMembres.length; j++) {
                        console.log(listeMembres[j]._id)
                        if (listeMembres[j]._id == idM) {

                            if (listeMembres[j]._id == idM) {
                                membreL = listeMembres[j];
                                console.log("tester role par membreL")

                                console.log(listeMembres.length)
                                listeMembres.splice(j, 1);
                                console.log("*****************")
                                console.log(listeMembres.length)







                                // console.log(listeMembres[j]._id)
                                //     console.log(listeMembres[j].Role)
                                //     listeMembres[j].Role = "lead";
                                //     console.log(listeMembres[j].Role)
                                //     console.log('_______')
                                //     console.log(listeMembres[j].LastName)
                                //     console.log("baed leader")
                                //     console.log(listeMembres.length)
                                //     sessions.Project[i].members = listeMembres;
                                sessions.Project[i].members = listeMembres;
                                console.log('******')
                                console.log(sessions.Project[i].members)
                            }
                        }
                    }
                    Membre.findByIdAndRemove(idM).then(console.log('member deleted')).catch();

                } else {
                    console.log("not found")
                    console.log(idP)
                    console.log(sessions.Project[i]._id)
                    //res.send("project not found")
                }

            }

            sessions.save();
            res.send({done:true})
        }).catch(()=>{
        res.send({done:false})

    });

});


//put member findByIdAndRemove
router.put('/editMember/:idSession/:idProjet/:idMember', upload.single('image'), (req, res) => {
    console.log("updated member");

    var idS = req.params.idSession;
    console.log(idS);
    var idP = req.params.idProjet;
    console.log(idP);
    var idM = req.params.idMember;
    console.log(idM);
    var idS = req.params.idSession;
    console.log(idS);
    var idP = req.params.idProjet;
    console.log(idP);
    var idM = req.params.idMember;
    console.log(idM);
    Session.findById(idS).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {

            for (var i = 0; i < sessions.Project.length; i++) {
                console.log(sessions.Project[i]._id)
                console.log("id projet")
                console.log(idP)
                if (sessions.Project[i]._id == idP) {

                    var listeMembres = []
                    listeMembres = sessions.Project[i].members;
                    console.log(listeMembres)

                    for (var j = 0; j < listeMembres.length; j++) {
                        var membreL = [];

                        if (listeMembres[j]._id == idM) {
                            membreL = listeMembres[j];
                            console.log(membreL);
                            listeMembres.splice(j, 1);
                            //liste baed splice
                            console.log("***********");
                            console.log(listeMembres.length);

                            //tester sur limage
                            console.log(req.file.path);
                            console.log('image to text')
                            var Tesseract = require('tesseract.js')
                            //image = require('path').resolve(__dirname , '../'+req.file.path);
                            Tesseract.recognize(req.file.path)
                                .then(function (result) {


                                    var str = result.text;
                                    console.log(str)
                                    var letterNumber = /[0-9]{8}/;

                                    var found = result.text.match(letterNumber);

                                    var cin = "";
                                    console.log(found.toString())
                                    console.log(found.toString().length)
                                    if (found.toString().length == 8) {
                                        console.log("cin correcte")

                                        membreL.Password = req.body.Password;
                                        membreL.LinkFacebook = req.body.LinkFacebook;
                                        membreL.Bio = req.body.Bio;
                                        membreL.Description = req.body.Description;
                                        membreL.Role = req.body.Role;
                                        membreL.Email = req.body.Email;
                                        membreL.image = req.file.path;
                                        membreL.LinkLinkedIn = req.body.LinkLinkedIn;
                                        membreL.save();
                                        config.rootProfiles.push(req.body.LinkLinkedIn);
                                        config.user = req.body.LinkLinkedIn;
                                        config.idUser = idM;
                                        scrap(config);

                                        //pusher le membre dans la liste
                                        listeMembres.push(membreL);

                                        listeMembres.save();
                                        sessions.Project[i].members = listeMembres;
                                        sessions.Project[i].members.save();
                                        console.log("*****************")
                                        console.log(listeMembres.length)
                                    } else {
                                        console.log("cin incorrecte")
                                    }

                                });

                        }

                        console.log('******')
                        console.log(sessions.Project[i].members)


                        Membre.findById(idM).exec(function (err, member1) {
                            if (err)
                                res.status(400).send(err);
                            if (!member1)
                                res.status(404).send();
                            else {


                                Membre.findByIdAndUpdate(idM, membreL, {new: true}, (err, membre) => {
                                    console.log("updated member ");


                                });

                            }


                        });


                        console.log(membreL);
                    }
                } else {
                    console.log("not found");
                    console.log(idP);
                    console.log(sessions.Project[i]._id)
                    //res.send("project not found")
                }

            }

            sessions.save();
        }).catch();


});

//affecter education a un membre
router.post('/add/:idMember', (req, res) => {

    console.log("affecter education et experiences")
    var idM = req.params.idMember;


    Membre.findById(idM).exec(function (err, Membre, next) {


        require('../models/Education');
        const EducationModel = mongoose.model('Education');
        var educationn = new EducationModel({
            School: "ULT",
            Degree: "hell",
            FieldOfStudies: "sport",
            Description: "",
            StartDate: Date.now(),
            EndDate: Date.now()
        })
        educationn.save();

        var educationn2 = new EducationModel({
            School: "MSB",
            Degree: "hell",
            FieldOfStudies: "sport",
            Description: "",
            StartDate: Date.now(),
            EndDate: Date.now()
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
            Title: "experi1",
            Company: "Esprit",
            Location: "Tunis",
            Description: "Desss",
            StartDate: Date.now(),
            EndDate: Date.now(),
            currentlyWork: true
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
                message: 'affect member successfully',
                data: members
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    });


});


//definir le membre en tant que lead
router.put('/leader/:idSession/:idProjet/:idMember', (req, res) => {
    var idS = req.params.idSession;
    console.log(idS)
    var idP = req.params.idProjet;
    console.log(idP)
    var idM = req.params.idMember;
    console.log(idM)
    Session.findById(idS).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
        .then(sessions => {

            for (var i = 0; i < sessions.Project.length; i++) {
                console.log(sessions.Project[i]._id)
                console.log("id projet")
                console.log(idP)
                if (sessions.Project[i]._id == idP) {

                    console.log(sessions.Project[i].members.length)
                    var listeMembres = []
                    listeMembres = sessions.Project[i].members;
                    console.log(listeMembres)

                    for (var j = 0; j < listeMembres.length; j++) {
                        var membreL = [];

                        if (listeMembres[j]._id == idM) {
                            membreL = listeMembres[j];
                            console.log("tester role par membreL")
                            console.log(membreL.Role);
                            listeMembres.splice(j, 1);
                            console.log(listeMembres.length)

                            membreL.Role = 'lead';
                            console.log(membreL.Role)
                            listeMembres.push(membreL);

                            console.log("*****************")

                            console.log(listeMembres.length)

                            sessions.Project[i].members = listeMembres;
                            console.log('******')
                            console.log(sessions.Project[i].members)
                        }

                    }
                    sessions.Project[i].members = listeMembres;


                    Membre.findById(idM).exec(function (err, member1) {
                        if (err)
                            res.status(400).send(err);
                        if (!member1)
                            res.status(404).send();
                        else {
                            member1.Role = 'lead';
                            Membre.findByIdAndUpdate(idM, member1, {new: true}, (err, membre) => {
                                console.log("updated member as a leader");

                            });

                        }
                    })


                } else {
                    console.log("not found")
                    console.log(idP)
                    console.log(sessions.Project[i]._id)
                    //res.send("project not found")
                }

            }
            sessions.save();
            res.send({done:true})
        }).catch(()=>{
        res.send({done:false})

    });

});


//ajouter lien linked in
router.post('/addMemberwithLinkedIn/:idSession/:idProjet', upload.single('image'),
    function (req, res) {
        console.log("ajout membre");

        const MemberUSer = mongoose.model('Member');

        // Request validation
        if (!req.body) {
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
                console.log(str)
                var letterNumber = /[0-9]{8}/;

                var found = result.text.match(letterNumber);

                var cin = "";
                console.log(found.toString())
                console.log(found.toString().length)
                if (found.toString().length == 8) {
                    console.log("cin correcte")
                    //ajouter member
                    var UserMem = new MemberUSer({

                        Password: req.body.Password,
                        LinkFacebook: req.body.LinkFacebook,
                        Bio: req.body.Bio,
                        Description: req.body.Description,
                        Role: req.body.Role,
                        Email: req.body.Email,
                        image: req.file.path,
                        Cin: found.toString(),
                        LinkLinkedIn: req.body.LinkLinkedIn
                    });


                    UserMem.save().then(members => {
                        console.log('----'+members.id);
                        // config.rootProfiles.push(req.body.LinkLinkedIn);
                        // config.user = req.body.LinkLinkedIn;
                        // config.idUser = members.id;
                        // scrap(config);
                        res.send({
                            message: 'member add successfully',
                            data: members
                        });
                    }).catch();

                    //Affecter el membre lel projet mte session
                    var idS = req.params.idSession;
                    console.log(idS);
                    var idP = req.params.idProjet;
                    console.log(idP);

                    Session.findById(idS).populate({path: 'Project.createdBy', populate: {path: 'TypeLabel'}})
                        .then(sessions => {
                            for (var i = 0; i < sessions.Project.length; i++) {
                                if (sessions.Project[i]._id == idP) {

                                    console.log(sessions.Project[i].members.length)
                                    var listeMembres = []
                                    listeMembres = sessions.Project[i].members;
                                    console.log(listeMembres)

                                    listeMembres.push(UserMem);
                                    console.log("baed lpush")
                                    console.log(listeMembres.length)
                                    sessions.Project[i].members = listeMembres;
                                    sessions.save();


                                } else {
                                    console.log("not found")
                                    console.log(idP)
                                    console.log(sessions.Project[i]._id)
                                }
                            }


                        }).catch();


                } else {
                    console.log("cin incorrecte")
                }


            }).catch()


    });


// Export API routes
module.exports = router;
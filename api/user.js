var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('Candidat');
const Userr = mongoose.model('Admin');
const UserCharge = mongoose.model('Charge');
router.get('/', function (req, res) {
    User.find().exec( function (err, User){
        if (err)
            res.send(err)
        if (!User)
            res.status(404).send();
        else {
            res.json(User);
            console.log(User)
        }
    });
});
router.post('/addCandidature',function (req,res) {
    //ajouter admin
    var candidat = new User({
        FirstName: "akrout",
        LastName: "haifa",
        Email: "haifa.akrout@esprit.tn",
        Password:"hafhouf",
        Status:"en attente"
    });
    candidat.save();
})

router.post('/addCandidat', function (req, res) {

    //ajouter admin
    var UserAdmin = new Userr({
        FirstName: "admin1",
        LastName: "admin1",
        Email: "admin1@gmail.com",
        Password:"123456"
    });
    UserAdmin.save(function (err, UserAdmin) {
        if (err) {
            res.send(err)
        }
        else
            res.send(UserAdmin)
    });
    console.log(UserAdmin);

   /* require('../models/Label');
    var Label = mongoose.model('Label');
    var label1 = new Label({
        type:"prelabel",
        SoumissionDate:Date.now(),
        PreLabelDate:Date.now()
    });*/

    var UserCharge1 = new UserCharge({
        FirstName: "charge1",
        LastName: "charge1",
        Email: "charge1@gmail.com",
        Password:"123456",
        createdBy: UserAdmin.id,
        projets:[{
            Name: 'ProjetSalleDeSport',
            members: [{
                Role: 'lead',
                LastName: 'Fadhloun',
                FirsName: 'Feriel',
                Email: 'Fadhloun.Feriel@esprit.tn',
                Password: 'Feriel'

            }]
        }]
    });

    console.log(UserCharge1.id)
    UserCharge1.save().catch(err=>console.log(err));


});

router.post('/:id/addCandidat', function (req, res) {
console.log("ajout candidat");
    var id = req.params.id;
    require('../models/Label');
    var Label = mongoose.model('Label');
    var label1 = new Label({
        type:"prelabel",
        SoumissionDate:Date.now(),
        PreLabelDate:Date.now()
    });

    console.log(label1.id);
    label1.save();
    console.log(label1.id)
    User.findById(id).exec(function (err , User) {
        console.log(User.id)
        User.TypeLabel=label1.id
        User.save(function (err , User) {
            if (err)
                res.send(err);
            else
                res.send(User)
        });

    });
});


router.post('/addAdmin', function (req, res) {

    var User1 = new Userr({
        FirstName: "feriel",
        LastName: "feriel",
        Email: "fadhloun@gmail.com",
        Password:"123456"
    })
    User1.save(function (err, User) {
        if (err) {
            res.send(err)
        }
        else
            res.send(User)
    })
    // res.render('judge.twig')
});


module.exports = router;
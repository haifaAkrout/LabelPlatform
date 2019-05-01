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


//Ajouter candidature
router.post('/addCandidat/:idLab', function (req, res) {

    require('../models/Label');
    var Label = mongoose.model('Label');
    Label.findById(req.params.idLab).then(lab=>{
        //ajouter candidature
        var UserAdmin = new User({
            FirstName: "candidat4",
            LastName: "candidat4",
            Email: "candidat4@gmail.com",
            Password: "123456",
            Status: "non traité",
            TypeLabel: lab._id
        });
        UserAdmin.save(function (err, UserAdmin) {
            if (err) {
                res.send(err)
            } else
                res.send(UserAdmin)
        });
        console.log(UserAdmin);
    }    )




    // var UserCharge1 = new UserCharge({
    //     FirstName: "charge1",
    //     LastName: "charge1",
    //     Email: "charge1@gmail.com",
    //     Password:"123456",
    //     createdBy: UserAdmin.id,
    //     Status: "non traité"
    //
    // });
    //
    // console.log(UserCharge1.id)
    // UserCharge1.save().catch(err=>console.log(err));


});

//afecter chargé lel candidature
router.post('/:idC/:idCharge/addCandidat', function (req, res) {
    console.log("ajout candidat");
    var id = req.params.idC;
    var idC = req.params.idCharge;

    UserCharge.findById(idC).exec(function (err,charge) {
        console.log("id charge")
        console.log(charge._id)

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
            User.TypeLabel=label1.id,
                User.review= charge._id
            User.save(function (err , User) {
                if (err)
                    res.send(err);
                else
                    res.send(User)
            });

        });
    })



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


//Ajouter candidature
router.post('/addCharge/:idAdmin', function (req, res) {

    var idAd = req.params.idAdmin;
    var idR = req.params.idReviweC;
    require('../models/ReviewCharge');
    review = mongoose.model('ReviewCharge');
    review.findById(idR).then(
        review1=>{
            Userr.findById(idAd).exec(function (err,admin) {
                console.log("id admin");
                console.log(admin._id);
                //ajouter candidature
                var UserC = new UserCharge({
                    FirstName: "charge5",
                    LastName: "charge5",
                    Email: "charge5@gmail.com",
                    Password: "123456",
                    Status: "non traité",
                    createdBy: admin._id,
                    // review:review1._id
                });
                UserC.save(function (err , User) {
                    if (err)
                        res.send(err);
                    else
                        res.send(User)
                });

            });
        }
    )

});
module.exports = router;
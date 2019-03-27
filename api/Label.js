var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
require('../models/Label');
const Label = mongoose.model('Label');

router.get('/', function (req, res) {
    Label.find().exec( function (err, experiences){
        if (err)
            res.send(err)
        if (!experiences)
            res.status(404).send();
        else {
            res.json(experiences);
            console.log(experiences)
        }
    });
});
router.post('/add', function (req, res) {
    console.log("add label")

     var Label1 = new Label({
          type:"prelabel",
          SoumissionDate:Date.now(),
          PreLabelDate:Date.now()
      });

      Label1.save(function (err, experiences) {
          if (err) {
              res.send(err)
          }
          else
              res.send(experiences)
      })
});
module.exports = router;
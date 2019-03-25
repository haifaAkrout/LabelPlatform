const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//getAll request membre
router.get('/',(req,res)=>{
    Idea.find({})
        .sort({date:'desc'})
        .then(ideas=>{
            res.render('sessions.twig',{sessions:sessions});
        });
    res.render('sessions.twig')
});
// Export API routes
module.exports = router;
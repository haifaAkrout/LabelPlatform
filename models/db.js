var mongoose=require('mongoose')

mongoose.connect('mongodb+srv://feriel:feriel@mongodb01-4il3d.mongodb.net/test',{ useNewUrlParser: true ,'useCreateIndex': true})
    .then(()=>
    {
        console.log("mongoDB connected successfully...!!")
    })

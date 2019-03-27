var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/labelPlatform1',{ useNewUrlParser: true ,'useCreateIndex': true})
    .then(()=>
    {
        console.log("mongoDB connected successfully...!!")
    })

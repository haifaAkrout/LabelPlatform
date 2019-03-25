var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/labelPlatform', { useNewUrlParser: true })
.then(()=>
{
    console.log("mongoDB connected successfully...!!")
})
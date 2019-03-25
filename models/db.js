var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/labelPlatform')
.then(()=>
{
    console.log("connected")
})
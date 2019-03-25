var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/labelPlatform1')
.then(()=>
{
    console.log("connected")
})
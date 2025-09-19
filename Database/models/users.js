const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/testapp")

const userSchema=mongoose.Schema({
    name:String,
    image:String,
    email:String
})

module.exports=mongoose.model('user',userSchema);
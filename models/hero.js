const mongoose=require('mongoose')
const Hero=mongoose.model('hero',{
  
    name:String,
    power:Number,
    image:String,
    date:String

})

module.exports=Hero
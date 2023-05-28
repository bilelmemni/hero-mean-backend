const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/hero')
.then(
    ()=>{
        console.log('connecté');
    }
)
.catch(
    (err)=>{
        console.log(err);
    }
)


module.exports=mongoose
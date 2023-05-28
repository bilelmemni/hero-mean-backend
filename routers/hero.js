const express=require('express');
const multer=require('multer')
const Hero=require('../models/hero')
const router=express.Router()
filename='';
const mystorage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,redirect)=>{
        let date=Date.now();
        let fl=date+'.'+file.mimetype.split('/')[1]
        redirect(null,fl)
        filename=fl

    }
});
const upload=multer({storage:mystorage})


//CRUD
router.post('/add',upload.any('image'),async(req,res)=>{
    try {
        data=req.body;
        prd=new Hero(data) 
        prd.image=filename
        savedHero=await prd.save()
        filename=''
        res.status(200).send(savedHero)
    } catch (error) {
        res.status(400).send(error)
    }
});
router.post('/create',async(req,res)=>{
    try {
        data=req.body;
        prd=new Hero(data) 
        savedHero=await prd.save()
        console.log(savedHero);
        res.status(200).send(savedHero)
    } catch (error) {
        res.status(400).send(error)
    }
});
router.post( '/ajout'  , ( req , res )=>{
    let dataFromPostman = req.body;
    let hero = new Hero( dataFromPostman );
  
    hero.save()
          .then(
              (savedHero)=>{
                 
                  console.log(savedHero);
                  res.send(savedHero);
              }
          )
          .catch(
              (error)=>{
                  console.log(error);
                  res.send(error)
              }
          )
  } );
router.get('/getall',async(req,res)=>{

    try {
        Heros= await Hero.find()
        res.status(200).send(Heros)
        
    } catch (error) {
        res.status(400).send(error)
    }
});
router.get('/getbyid/:id' , (req, res)=>{
  
    let myid = req.params.id;

    Hero.findOne({ _id: myid })
                .then(
                    (art)=>{
                        res.send(art);
                    }
                )
                .catch(
                    (err)=>{
                        res.send(err)
                    }
                )

})

router.delete('/delete/:id',async(req,res)=>{
    try {
        myid=req.params.id;
        deleteHero= await Hero.findOneAndDelete({_id:myid})
        res.status(200).send(deleteHero)

    } catch (error) {
        res.status(400).send(error)
    }
});
router.put('/update/:id',async(req,res)=>{
    try {
        myid=req.params.id;
        newdata=req.body;
        saveupdate= await Hero.findOneAndUpdate({_id:myid},newdata)
        res.status(200).send(saveupdate)
        
    } catch (error) {
        res.status(400).send(error)
    }

})





module.exports=router
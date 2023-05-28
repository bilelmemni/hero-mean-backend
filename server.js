const express=require('express');
require('./config/connect')

const routerhero=require('./routers/hero')

const app=express();
const cors = require('cors');

app.use(express.json())
app.use(cors());

app.use('/hero',routerhero)
app.use('/image',express.static('./uploads'))




app.listen(3000,()=>{
    console.log('hello');
})
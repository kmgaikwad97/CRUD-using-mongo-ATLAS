const express = require('express');
const app = express();
const port = process.env.PORT || 3200;
require("./db/conn")
const MensRanking = require("./models/mens");
const router = require('./routers/men');


// just to check in the start
// app.get('/',async(req,res)=>{
//     res.send("hello this is home page")
// })

app.use(express.json());

// router
app.use(router);



// Create = POST 
app.post("/mens",async(req,res)=>{
    try{
        const addingMensRecords = new MensRanking(req.body)
        console.log(req.body);
        const insertMens = await addingMensRecords.save()
        res.status(201).send(insertMens);
    }catch(err){
        res.status(400).send(err)
    }
})



// READ = GET 
app.get("/mens",async(req,res)=>{
    try{
        const getMens = await MensRanking.find({}).sort({"ranking":1});
        res.send(getMens);
    }catch(err){
        res.status(400).send(err)
    }
})




// want to read Particular READ = GET 
app.get("/mens/:id",async(req,res)=>{
    try{
        const _id = req.params.id
        const getMen = await MensRanking.findById(_id);
        res.send(getMen);
    }catch(err){
        res.status(400).send(err)
    }
})




// want to UPDATE = PATCH 
app.patch("/mens/:id",async(req,res)=>{
    try{
        const _id = req.params.id
        const getMen = await MensRanking.findByIdAndUpdate(_id,req.body, {new:true});
        res.send(getMen);
    }catch(err){
        res.status(500).send(err)
    }
})






// want to REMOVE = DELETE 
app.delete("/mens/:id",async(req,res)=>{
    try{
        const getMen = await MensRanking.findByIdAndDelete(req.params.id);
        res.send(getMen);
    }catch(err){
        res.status(500).send(err)
    }
})









app.listen(port,()=>{
    console.log(`Connection is live at port number ${port}`);
})
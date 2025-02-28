const express = require('express')
const router = express.Router() 

const recceteModel = require('../Models/RecceteModel');

router.get("/",(req,res)=>{ 
    res.send("Reccete route is displaying data") 
})

router.get("/all", async (req,res)=>{ 
    try {
        const reccetes = await recceteModel.find({});
        res.json(reccetes)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.get("/names", async (req,res)=>{ 
    try {
        const reccetes = await recceteModel.find({}, {_id: 0}).select('nom');
        res.json(reccetes)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.post("/add", async(req,res)=>{ 
    try {
        const date = await recceteModel.insertOne(req.body);
        res.json(date)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.put("/update/:name", async (req,res)=>{ 
    try {
        const date = await recceteModel.updateOne({nom: req.params.name}, req.body);
        res.json(date)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.delete("/delete/:name", async (req,res)=>{ 
    try {
        const date = await recceteModel.deleteOne({nom: req.params.name});
        res.json(date)
    }
    catch(error){
        res.json({message: error.message})
    }
})

module.exports=router;
const express = require('express')
const router = express.Router() 

const chefModel = require('../Models/ChefModel');
const Recette = require('../Models/RecceteModel');

router.get("/",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.get("/all", async (req,res)=>{
    try {
        const chefs = await chefModel.find({})
        res.json(chefs) 
    }
    catch (error) {
        res.json({ message: error.message });
    }
})

router.get("/names", async (req,res)=>{ 
    try {
        const chefNames = await chefModel.find({}, {name:1, _id:0})
        res.json(chefNames)
    }
    catch (error){
        res.json({ message: error.message });
    }
})

router.get("/reccete", async (req,res)=>{
    try {
        const chefs = await chefModel.aggregate([
            {
                $lookup: { from: 'recettes', localField: '_id', foreignField: 'chef', as: 'recettes'}
            },
            {
                $project: {nom: 1, prenom: 1, nombreRecettes: { $size: '$recettes' }}
            }
        ]);
        res.json(chefs);
    } 
    catch (error) {
        res.json({ message: error.message });
    }  
})

router.post("/add", async (req,res)=>{ 
    try {
        const data = await chefModel.insertOne(req.body);
        res.json(data)
    }
    catch(error){
        res.json({ message: error.message });
    }
})

router.put("/update/:name", async (req,res)=>{ 
    try {
        const data = await chefModel.updateOne({nom: req.params.name}, req.body);
        res.json(data)
    }
    catch(error){
        res.json({ message: error.message });
    }
})

router.delete("/delete/:name", async (req,res)=>{
    try {
        const data = await chefModel.deleteOne({nom: req.params.name});
        res.json(data)
    }
    catch(error){
        res.json({ message: error.message });
    }
})

module.exports=router;
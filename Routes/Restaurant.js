const express = require('express')
const router = express.Router() 

const restaurantModel = require('../Models/RestaurantModel');

router.get("/",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.get("/all", async (req,res)=>{ 
    try {
        const restaurants = await restaurantModel.find({});
        res.json(restaurants)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.get("/chefs/:restaurantname", async (req,res)=>{ 
    try {
        const restaurant = await restaurantModel.findOne({ nom: req.params.restaurantname }).populate('chefs');
        res.json(restaurant.chefs)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.get("/recettes/:restaurantname", async (req,res)=>{ 
    try {
        const restaurant = await restaurantModel.findOne({ nom: req.params.restaurantname }).populate('recettes');
        res.json(restaurant.recettes)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.get("/listCategorie/:category", async (req,res)=>{ 
    try {
        const restaurant = await restaurantModel.find({ categorie: req.params.category });
        res.json(restaurant)
    }
    catch(error){
        res.json({message: error.message})
    }
})

// router.get("/list",(req,res)=>{ 
//     res.send("Chefs route is displaying data") 
// })

router.get("/:annee1/:annee2",async (req,res)=>{
    try {
        const restaurant = await restaurantModel.find({anneeOuverture:{
            $gte:req.params.annee1,
            $lte:req.params.annee2
        }} ).sort({anneeOuverture:1});

        res.json(restaurant)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.post("/add",async(req,res)=>{ 
    try {
        const date = await restaurantModel.updateOne({nom: req.params.name}, req.body);
        res.json(date)
    }
    catch(error){
        res.json({message: error.message})
    }
})

router.delete("/delete/:name", async (req,res)=>{ 
    try {
        const date = await restaurantModel.deleteOne({nom: req.params.name});
        res.json(date)
    }
    catch(error){
        res.json({message: error.message})
    }
})

module.exports=router;
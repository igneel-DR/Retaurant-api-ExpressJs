const express = require('express')
const router = express.Router() 

const restaurantModel = require('../Models/RestaurantModel');

router.get("/all",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.get("/chefs/:restaurantname",(req,res)=>{ 
    res.send(req.params.restaurantname) 
})

router.get("/recettes/:restaurantname",(req,res)=>{ 
    res.send(req.params.restaurantname) 
})

router.get("/listCategorie/:category",(req,res)=>{ 
    res.send(req.params.category) 
})

router.get("/list",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.get("/:annee1/:annee2",(req,res)=>{ 
    res.send(req.params.annee1+" | "+req.params.annee2) 
})

router.post("/add",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.put("/update/:name",(req,res)=>{ 
    res.send(req.params.name) 
})

router.delete("/update/:name",(req,res)=>{ 
    res.send(req.params.name) 
})

module.exports=router;
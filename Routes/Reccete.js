const express = require('express')
const router = express.Router() 

const recceteModel = require('../Models/RecceteModel');

router.get("/",(req,res)=>{ 
    res.send("Reccete route is displaying data") 
})

router.get("/all",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.get("/names",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.post("/add",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.put("/update/:name",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

router.delete("/update/:name",(req,res)=>{ 
    res.send("Chefs route is displaying data") 
})

module.exports=router;
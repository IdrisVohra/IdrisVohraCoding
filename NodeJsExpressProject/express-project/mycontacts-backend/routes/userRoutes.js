const express = require("express");

const router = express.Router();

router.post("/register",(req,res)=>{
    res.json({message:"Register New Nigga"});
});
router.post("/login",(req,res)=>{
    res.json({message:"Login Nigga"});
});
router.post("/current",(req,res)=>{
    res.json({message:"Current Nigga Info"});
});

module.exports = router;
const express = require ("express");
const app=express();
const hbs = require("hbs")
const path = require("path");
const templatePath=path.join(__dirname,'../templates');
const database = require('../database/databasQuery');

const connectDb = require('../src/dbConnection');
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views",templatePath)

app.get("/",(req,res)=>{
    res.render("login");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post("/signup",async (req,res)=>{

    const data ={
        name:req.body.name,
        paswword:req.body.paswword
    }
    database.InsertData();
    res.render("home");
});
app.listen(3000,()=>{
    console.log("Connection to port succedded");
});
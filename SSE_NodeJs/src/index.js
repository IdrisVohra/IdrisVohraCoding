const express = require ("express");
const app=express();
const hbs = require("hbs")
const path = require("path");
const templatePath=path.join(__dirname,'../templates');
const database = require('../database/databasQuery');
const images=path.join(__dirname,'../images');

const connectDb = require('../src/dbConnection');
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(images));

app.set("view engine","hbs");
app.set("views",templatePath)

app.get("/dynamic", (req, res) => { 
    imageList = [];
    imageList.push({ src: "/images/main_logo.png", name: "javascript" });
    res.render("dynamic", { imageList: imageList }); 
});

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
    //database.InsertData();
    res.render("home");
});
app.listen(3000,()=>{
    console.log("Connection to port succedded");
});
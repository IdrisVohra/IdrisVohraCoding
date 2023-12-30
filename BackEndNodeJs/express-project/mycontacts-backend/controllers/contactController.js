const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContact = asyncHandler(async (req, res) => {
    console.log("The Request body is:-",req.body);
    const{name,email}=req.body;
    if(!name || !email)
    {
        res.status(404);
        throw new Error("Nigga supply all fields");
    }
    res.json({
        message: 'NodeJs Bolte!'
    });
});

const createContact = asyncHandler(async (req, res) => {
    const contacts= await Contact.find();
    res.json(contacts); 
});
const updateContact = asyncHandler(async (req, res) => {
    res.json({
        message: 'NodeJs Update Bolte!'
    }); 
});
const deleteContact = asyncHandler(async (req, res) => {
    res.json({
        message: 'NodeJs Delete Bolte!'
    }); 
});

module.exports ={getContact,createContact,updateContact,deleteContact};
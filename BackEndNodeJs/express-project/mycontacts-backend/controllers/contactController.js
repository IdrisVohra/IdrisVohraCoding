const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContact = asyncHandler(async (req, res) => {
    const contacts= await Contact.find();
    res.json(contacts);
});

const getContactById = asyncHandler(async (req, res) => {
    const contacts= await Contact.findById(req.params.id);
    if(!contacts)
    {
        res.status(404);
        throw new Error("Nigga's Contact is black as his skin")
    }
    res.json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    console.log("The Request body is:-",req.body);
    const {name,email}=req.body;
    if(!name || !email)
    {
        res.status(404);
        throw new Error("Nigga supply all fields");
    }
    const contacts = await Contact.create({
        name,
        email,
    });
    res.status(201).json(contacts); 
});
const updateContact = asyncHandler(async (req, res) => {
    const contacts= await Contact.findById(req.params.id);
    if(!contacts)
    {
        res.status(404);
        throw new Error("Nigga's Contact is black as his skin")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
    );
    res.status(200).json(updatedContact); 
});
const deleteContact = asyncHandler(async (req, res) => {
    const contacts= await Contact.findById(req.params.id);
    if(!contacts)
    {
        res.status(404);
        throw new Error("Nigga's Contact is black as his skin")
    }
    await Contact.deleteOne();
    res.json(contacts); 
});

module.exports ={getContact,getContactById,createContact,updateContact,deleteContact};
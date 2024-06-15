const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Add Contact Name"]
    },
    email:{
        type:String,
        required:[true,"Please Add Contact Email"]
    },
}, {
    timestamps: true,  
});
module.exports = mongoose.model("Contact",contactSchema); 
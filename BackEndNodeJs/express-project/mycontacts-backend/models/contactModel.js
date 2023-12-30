const msSql = require("mssql");
const dbConnection=require("../config/dbConnection");
/*
let contactSchema =({
    name:{
        type:String,
        reequired:[true,"Please Add Contact Name"]
    },
    email:{
        type:String,
        reequired:[true,"Please Add Contact Email"]
    },
}, {
    timestamps: true,  
});
*/
let pool = msSql.connect(dbConnection);
const contactSchema = pool.request().input({
    name:{
        type:msSql.NVarChar,
        reequired:[true,"Please Add Contact Name"]
    },
    email:{
        type:msSql.NVarChar,
        reequired:[true,"Please Add Contact Email"]
    },
}, {
    timestamps: true,  
});
module.exports = msSql.query("Contact",contactSchema); 
const {constants}= require("../constant");
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({tittle:"Daam Nigga supply all fields",message:err.message,stackTrace:err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({tittle:"Nigga is Unauthorized",message:err.message,stackTrace:err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({tittle:"Nigga is Forbidden",message:err.message,stackTrace:err.stack});
            break;
        case constants.YOU_NIGGA:
            res.json({tittle:"Nigga is blacker than a black nigga",message:err.message,stackTrace:err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({tittle:"Server Error Nigga",message:err.message,stackTrace:err.stack});
            break;
        default:
            console.log("Nigga came out as a white man");
            break;
    }
    res.json({message:err.message,stackTrace:err.stack});
};

module.exports = errorHandler;
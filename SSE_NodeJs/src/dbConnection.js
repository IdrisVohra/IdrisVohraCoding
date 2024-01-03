const msSql = require ("mssql");

const connectDb = async ()=>{
    try{
        const connect={
            user:"DESKTOP-GDM06K2\idree",
            server:"DESKTOP-GDM06K2",
            schema:'dbo',
            multipleStatements: true,
            options:{
                trustedconnection: true,
                enableArithAbort: true,
                instancename: 'MSSQLSERVER'
            },
            /* Added when using in Accenture laptop
            const connect={  
                user :'DC_UAT_V8_MIG',
                password :'92uWaD4YH_Vwtg3`',
                server:'10.149.0.71',
                database:'DMS_VNM_QA',
                schema:'dbo',
                multipleStatements: true,
                options:{
                    trustedconnection: true,
                    enableArithAbort : true,  
                    instancename :'MSSQLSERVER'
                },*/
            port: 1433
        };
            console.log("Database Connected");
        }
     catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports=connectDb;
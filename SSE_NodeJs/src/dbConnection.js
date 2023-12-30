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
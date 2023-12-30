const msSql = require ("mssql");
const connectDb = require('../src/dbConnection');
module.exports={
InsertData: async function(){
    let pool = await msSql.connect(connectDb);
    let sqlQuery= `BEGIN
    CREATE TABLE #TEMP_STORE_DATA
    (
        NAME NVARCHAR(20),
        PASSWORD NVARCHAR(20)
    )
    INSERT INTO #TEMP_STORE_DATA VALUES (@NAME,@PASSWORD);
    END`;
    const res = await pool.request().input(
        ("NAME",msSql.NVarChar,data.name),
        ("PASSWORD",msSql.NVarChar,data.password)
        ).query(sqlQuery)
}
};
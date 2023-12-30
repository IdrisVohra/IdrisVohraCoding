const express = require('express')
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorHandler.js');
const connectDb = require('./config/dbConnection.js');
connectDb();
const app = express()


app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
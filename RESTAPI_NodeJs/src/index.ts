const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const mongoose=require('mongoose');

const app = express();

app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080,()=>{
    console.log("Server Alive");
});

const MONGO_URL='mongodb+srv://idrees786:idrees786@cluster0.sfr7hr4.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error: Error)=> console.error(error));
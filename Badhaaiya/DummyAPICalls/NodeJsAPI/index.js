const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 5000;

const apiRoutes = require('./API/API.js');

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

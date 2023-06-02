const express = require('express');
const multer = require('multer');
const app = express();
//--------------- Configure Env ---------------
require('dotenv').config();

//--------------- Database Connection ---------------
require('./database/db_connection');


app.listen(process.env.PORT, () => {
    console.log('Server is running');
});
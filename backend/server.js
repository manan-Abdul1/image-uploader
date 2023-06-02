const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

//--------------- Configure Env ---------------
require('dotenv').config();

//--------------- Database Connection ---------------
require('./database/db_connection');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running');
});

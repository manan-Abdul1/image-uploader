const mongoose = require('mongoose');
const mongoUrl = process.env.DB_URL;
mongoose.set('strictQuery', true);

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log("MongoDB Connection Success");
});

connection.on('error', () => {
  console.log("MongoDB Connection Failed");
});

module.exports = mongoose;

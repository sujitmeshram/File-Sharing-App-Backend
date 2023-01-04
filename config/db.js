//database connection
// https://mongoosejs.com/docs/connections.html
require("dotenv").config();
const mongoose = require("mongoose");

function connectDB() {
  // Database connection
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  const connection = mongoose.connection;

  //   https://stackoverflow.com/questions/49607841/mongoose-connectiononce-what-does-it-mean
  connection
    .once("open", () => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Connection failed ");
    });
}

module.exports = connectDB;

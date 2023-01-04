require("dotenv").config();

// creating express server here
const express = require("express");
const app = express();

// port
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

// Cors
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
};

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors(corsOptions));

//telling express that our static files is in 'public' folder
app.use(express.static("public"));

// db connection requiring
const connectDB = require("./config/db");

// I am exporting fucntion from /config/db, so calling that function here
connectDB();

//enabling server.js data
app.use(express.json());

// template engine ejs
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// ---------------------------Routes-------------------------------
// if "/api/files" this type of url it is, then send it to "./routes/files"
app.use("/api/files", require("./routes/files"));

//if this type of route is here '/files', then send it to './routes/show', basically its download page route
app.use("/files", require("./routes/show"));

// if url is "/files/download" then send it to "routes/download"
app.use("/files/download", require("./routes/download"));

//listening on port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

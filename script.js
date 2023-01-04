const connectDB = require("./config/db");
const File = require("./models/file");
const fs = require("fs");

connectDB();

//deleting files after 24 hours
// Get all records older than 24 hours
async function fetchData() {
  //mongo query for 24 hours
  const files = await File.find({
    createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });
  //checking if any files there or not
  if (files.length) {
    for (const file of files) {
      try {
        // https://stackoverflow.com/questions/5315138/node-js-remove-file
        // using filesystem module, deleting from upload folder
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`successfully deleted ${file.filename}`);
      } catch (err) {
        console.log(`error while deleting file ${err} `);
      }
    }
  }
  //   after deleting all files
  console.log("Job done!");
}

fetchData().then(process.exit);

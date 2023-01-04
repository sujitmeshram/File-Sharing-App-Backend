//file model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//file schema
const fileSchema = new Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    // generated id
    uuid: { type: String, required: true },
    //sender and receiver is not required, if client dont want to send link through mail
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
  },

  //createdAt and updatedAt fields will generate because of timestamps
  { timestamps: true }
);

//generating mongoose model and exporting
//model name is 'File', in database, it will be 'Files'
module.exports = mongoose.model("File", fileSchema);

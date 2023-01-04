const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  // Extract link and get file from storage send download stream
  const file = await File.findOne({ uuid: req.params.uuid });
  // if file is not there, Link expired
  if (!file) {
    return res.render("download", { error: "Link has been expired." });
  }
  const response = await file.save();

  //genetating filepath for downloading it from database
  const filePath = `${__dirname}/../${file.path}`;
  //downloading filepath here to download
  res.download(filePath);
});

module.exports = router;

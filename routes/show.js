const router = require("express").Router();
const File = require("../models/file");

//giving here uuid as parameter, for dowload page
// reference : `${process.env.APP_BASE_URL}/files/${response.uuid}`
router.get("/:uuid", async (req, res) => {
  try {
    //fetching uuid from mongoDB Database
    const file = await File.findOne({ uuid: req.params.uuid }); //giving uuid
    // Link expired
    if (!file) {
      //then render download means 'views\download.ejs'
      return res.render("download", { error: "Link has been expired." });
    }

    //if not error, then send all
    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (err) {
    //then render download means 'views\download.ejs'
    return res.render("download", { error: "Something went wrong." });
  }
});

module.exports = router;

// importing express Router
const router = require("express").Router();
// https://www.npmjs.com/package/multer
const multer = require("multer");
const path = require("path");
const File = require("../models/file");

// https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// https://www.npmjs.com/package/multer#:~:text=storage-,DiskStorage,-The%20disk%20storage
let storage = multer.diskStorage({
  //for where my file wants to store, 'cb' stands for callback and 'uploads' for to store it in 'uploads' folder
  destination: (req, file, cb) => cb(null, "uploads/"),

  //filename
  filename: (req, file, cb) => {
    //generating Unquie File Name, mutilplying to 1e9(I guess its one billion),
    // 'path' is inbuilt nodejs module, 'extname' gives that file's extension name,
    //'file.originalname' providing the file's original name

    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    //passing name into cb(callback)
    cb(null, uniqueName);
  },
});

//uploading through multer
//setting file limit to 100mb
//"myfile" is from client, its from form input file "name" attribute , t=40min
let upload = multer({ storage, limits: { fileSize: 1000000 * 100 } }).single(
  "myfile"
); //100mb

//if I write '/' url, it means '/api/files' because I'm using "app.use("/api/files", require("./routes/files"));" in server.js
router.post("/", (req, res) => {
  //calling upload fucntion here
  upload(req, res, async (err) => {
    if (err) {
      //if err, then send 500
      return res.status(500).send({ error: err.message });
    }

    //if not err, then store it in database, see 'models/file.js'
    const file = new File({
      filename: req.file.filename, //filename from body
      // will generate unique id
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });

    //saving file here
    const response = await file.save();

    //generating download page link here
    res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
  });
});

//URL : PORT/api/files/send
router.post("/send", async (req, res) => {
  //getting "uuid, emailTo, emailFrom, expiresIn" from body
  const { uuid, emailTo, emailFrom, expiresIn } = req.body;

  //checking if all are there or not
  if (!uuid || !emailTo || !emailFrom) {
    return res
      .status(422)
      .send({ error: "All fields are required except expiry." });
  }

  // Get data from db
  try {
    const file = await File.findOne({ uuid: uuid });

    // if already email sent, then sender from file model will true
    if (file.sender) {
      return res.status(422).send({ error: "Email already sent once." });
    }

    //getting file.sender form emailFrom which is get from body
    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    // send mail, importing from /services/mailService
    const sendMail = require("../services/mailService");
    sendMail({
      from: emailFrom,
      to: emailTo,
      subject: "file sharing app",
      text: `${emailFrom} shared a file with you.`,

      // sending prarameters
      html: require("../services/emailTemplate")({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email`,
        size: parseInt(file.size / 1000) + " KB",
        expires: "24 hours",
      }),
    })
      .then(() => {
        return res.json({ success: true });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Error in email sending." });
      });
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});

//exporting router
module.exports = router;

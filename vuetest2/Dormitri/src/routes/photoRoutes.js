// photo routes and its used modules and APIs

const multer = require('multer');
const { useCssModule } = require('vue');
const express = require('express');
const { extension } = require('mime');
const photoRoutes = express.Router();
// init storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp/')
    },
    filename: function (req, file, cb) {
      // console.log(file.originalname + " is original");
      console.log(file);
      var userid = req.body.name;
      var extension = file.mimetype.split('/').pop();
      console.log(extension);

      const uniqueSuffix = "profile" + '-' + userid + "." + extension;
      // cb(null, file.fieldname + '-' + uniqueSuffix);
      cb(null, uniqueSuffix);
    }
  })
// upload multer
const upload = multer({ storage: storage });

photoRoutes.post('/profile', upload.single('profile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  console.log("profile photo successfully uploaded");
})

module.exports = photoRoutes;

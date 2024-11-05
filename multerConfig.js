// backend/multerConfig.js
const multer = require('multer');
const path = require('path');

// Set the destination to the absolute path for the 'Images' folder in frontend
const imagesPath = path.join(__dirname, '..', 'frontend','src' , 'Images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create an upload instance with multer configuration
const upload = multer({ storage });

module.exports = upload;

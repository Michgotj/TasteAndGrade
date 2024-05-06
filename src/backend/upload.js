const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const API_URL = 'http://localhost:443/recipes/upload'; 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });


  router.post('/recipes/upload', upload.single('image'), (req, res) => {
    res.json({ message: 'Image uploaded successfully' });
});

const imagePath = path.join(__dirname, 'upload', 'Fajitas.jpeg');
const imageData = fs.readFileSync(imagePath);

axios.post(API_URL, imageData, {
    headers: {
        'Content-Type': 'image/jpeg',
    },
}).then((response) => {
    console.log('Image uploaded successfully:', response.data);
}).catch((error) => {
    console.error('Error uploading image:', error);
});

const imagesRoutes = require('./images/images');
router.use('/images', imagesRoutes);
module.exports = router;
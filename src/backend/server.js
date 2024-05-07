const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');

const recipesRouter = require('./recipes');

const app = express();
const port = process.env.PORT || 800;
app.use((req, res, next) => {
  next();
});

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'mysql8010.site4now.net',
  user: 'aa8678_michgot',
  password: 'mg12345678',
  database: 'db_aa8678_michgot',
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

app.get('/recipes/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId;

   
  try {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO recipes (recipe_id, rating, review) VALUES (?, ?, ?)', [recipeId, rating, review]);
    connection.release();
    
    res.status(200).send('Review inserted successfully');
  } catch (err) {
    res.status(500).send('Error inserting review');
  }
});

app.use('/recipes', recipesRouter);

app.use('/recipes/upload', express.static('upload'));

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

const express = require("express");
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'mysql8010.site4now.net',
  user: 'aa8678_michgot',
  password: 'mg12345678',
  database: 'db_aa8678_michgot',
});

router.patch(":recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const { rating, review } = req.body;

  try {
    const connection = await pool.getConnection();
    const sql = "UPDATE recipes SET rating = ?, review = ? WHERE id = ?";
    await connection.query(sql, [rating, review, recipeId]);
    connection.release();

    res.status(200).json({ message: 'Recipe updated successfully' });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Error updating recipe' });
  }
});

router.post("/:recipeId/reviews", async (req, res) => {
  const recipeId = req.params.recipeId;
  const { rating, review } = req.body;

  try {
    const sql = "INSERT INTO recipe_reviews (recipe_id, rating, review) VALUES (?, ?, ?)";
    const connection = await pool.getConnection();
    await connection.query(sql, [recipeId, rating, review]);
    connection.release();

    res.status(200).send('Rating/feedback inserted successfully');
  } catch (err) {
    console.error('Error inserting rating/feedback:', err);
    res.status(500).send('Error inserting rating/feedback');
  }
});


router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const sql = "SELECT * FROM recipes"; // Assuming 'recipes' is your table name
    const [rows, fields] = await connection.query(sql);
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

router.get("/:recipeId/reviews", async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const connection = await pool.getConnection();
    const sql = "SELECT rating, review FROM recipe_reviews WHERE recipe_id = ?";
    const [rows, fields] = await connection.query(sql, [recipeId]);
    connection.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});


module.exports = router;
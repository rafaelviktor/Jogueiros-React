const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_id, user_name, user_email, celular FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json("Internal server error");
  }
});

router.get("/card", async (req, res) => {
  try {
    const fill = await pool.query(
      "SELECT id, id_anunciante, titulo, preco, imagem FROM anuncios ORDER BY id DESC;"
    );

    res.json(fill.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/card/popular", async (req, res) => {
  try {
    const fill = await pool.query(
      "SELECT id, id_anunciante, titulo, preco, imagem FROM anuncios ORDER BY visualizacao DESC;"
    );

    res.json(fill.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
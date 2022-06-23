const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
      const { q } = req.query

      const anuncios = await pool.query("SELECT * FROM anuncios WHERE titulo ILIKE $1", [`%${q}%`])

      res.status(200).json(anuncios.rows);
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Internal server error")
    }
});

router.get("/estado/:UF", async (req, res) => {
  try {
    const anuncios = await pool.query("SELECT * FROM anuncios WHERE estado = $1", [req.params["UF"]])

    res.status(200).json(anuncios.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal server error")
  }
})
module.exports = router;
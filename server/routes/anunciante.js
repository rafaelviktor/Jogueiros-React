const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const fill = await pool.query(
      `SELECT id, nome, cnpj, celular FROM anunciantes`
    );
    res.json(fill.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/anunciante/:id", async (req, res) => {
  try {
    const fill = await pool.query(
      `SELECT id, nome, cnpj, celular FROM anunciantes WHERE id = '${req.params['id']}'`
    );
    res.json(fill.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
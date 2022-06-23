const router = require("express").Router();
const pool = require("../db");

// ver todas as reservas cadastradas no sistema
router.get("/", async (req, res) => {
  try {
    const fill = await pool.query(
      'SELECT * FROM agendamentos'
    );

    res.json(fill.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error")
  }
})

// ver todas as reservas de um anúncio específico
router.get("/anuncio/:idAnuncio", async (req, res) => {
  try {
    const fill = await pool.query(
      `SELECT * FROM agendamentos WHERE id_anuncio = '${req.params['idAnuncio']}'`
    );

    res.json(fill.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error")
  }
})

// ver todas as reservas de um usuário específico
router.get("/:idUsuario", async (req, res) => {
    try {
      const fill = await pool.query(
        `SELECT * FROM agendamentos WHERE id_usuario = '${req.params['idUsuario']}'`
      );
  
      res.json(fill.rows);
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error")
    }
  })

  router.post("/cadastrar/:idUsuario", async (req, res) => {
    try {
        const { id_anuncio, nome_usuario, celular, titulo, preco, imagem, data_agendamento, hora_inicio, hora_final, status } = req.body

        const newAgendamento = await pool.query(
          'INSERT INTO agendamentos(id_anuncio, id_usuario, nome_usuario, celular, titulo, preco, imagem, data_agendamento, hora_inicio, hora_final, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
          [ id_anuncio, req.params['idUsuario'], nome_usuario, celular, titulo, preco, imagem, data_agendamento, hora_inicio, hora_final, status ])
    
          res.status(201).json("Agendamento realizado com sucesso.")
        } catch(err) {
          console.error(err.message)
          res.status(500).send("Internal server error")
        }
  })

  
  router.put("/aprovar/:id", async (req, res) => {
    try {
      const fill = await pool.query(
        `UPDATE agendamentos SET status = 'Aprovado' WHERE id = ${req.params['id']}`
      );

      res.status(201).json("Agendamento aceito.")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error")
    }
  });

  router.put("/recusar/:id", async (req, res) => {
    try {
      const fill = await pool.query(
        `UPDATE agendamentos SET status = 'Recusado' WHERE id = ${req.params['id']}`
      );
  
      res.status(201).json("Agendamento recusado.")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error")
    }
  });


  router.delete("/excluir/:id", async (req, res) => {
    try {
      const fill = await pool.query(
        `DELETE FROM agendamentos WHERE id = ${req.params['id']}`
      );
  
      res.status(201).json("Agendamento removido com sucesso")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error")
    }
  });

module.exports = router;
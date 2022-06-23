const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const fs = require('fs');
const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
  try {
    const fill = await pool.query(
      'SELECT id, id_anunciante, titulo, descricao, preco, imagem, cep, logradouro, numero, complemento, bairro, cidade, estado FROM anuncios'
    );

    res.json(fill.rows);

  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal server error")
  }
})

router.get("/anuncio/:idAnuncio", async (req, res) => {
  try {
    const fill = await pool.query(
      `SELECT id, id_anunciante, titulo, descricao, preco, imagem, cep, logradouro, numero, complemento, bairro, cidade, estado, visualizacao FROM anuncios WHERE id = ${req.params['idAnuncio']}`
    );

    const idAnunciante = fill.rows[0].id_anunciante;
    let views = fill.rows[0].visualizacao;
    views = parseInt(views)+1;

    const addViews = await pool.query(
      `UPDATE anuncios SET visualizacao = $1 WHERE id = ${req.params['idAnuncio']}`,
      [views])

    const fill2 = await pool.query(
      `SELECT user_name, celular FROM users WHERE user_id = '${idAnunciante}'`
    );

    let mergedInfo = [];
    mergedInfo.push({...fill.rows[0], ...fill2.rows[0]})

    res.status(200).json(mergedInfo);
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal server error")
  }
});

router.post("/cadastrar/:idAnunciante", async (req, res) => {
    try {
    const { id_anunciante, titulo, descricao, preco, imagem, cep, logradouro, numero, complemento, bairro, cidade, estado } = req.body

    const newAd = await pool.query(
      'INSERT INTO anuncios (id_anunciante, titulo, descricao, preco, imagem, cep, logradouro, numero, complemento, bairro, cidade, estado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *',
      [req.params['idAnunciante'], titulo, descricao, preco, imagem, cep, logradouro, numero, complemento, bairro, cidade, estado])

      res.status(201).json("Anúncio cadastrado com sucesso")
    } catch(err) {
      console.error(err.message)
      res.status(500).send("Internal server error")
    }
})

router.put("/editar/:idAnuncio", authorization, async (req, res) => {
  const { titulo, descricao, preco, imagem, cep, logradouro, numero, complemento, bairro, cidade, estado } = req.body
  try {
  const fill = await pool.query(
    `SELECT id_anunciante FROM anuncios WHERE id = ${req.params['idAnuncio']}`
  );

  const idAnunciante = fill.rows[0].id_anunciante;

  if(idAnunciante !== req.user) { // Verificar se anunciante é mesmo o dono do anúncio
    res.status(401).json("Você não tem autorização para alterar este anúncio")
  } else if( titulo === "" || preco === "" || cep === "" || logradouro === "" || bairro === "" || cidade === "" || estado === "") {
    // Verificar se há campos obrigatórios vazios, se sim, não realizar a query e retornar erro.
    res.status(200).json("É necessário preencher todos os campos obrigatórios")
  } else if (imagem === "") { // Verificar se o campo imagem foi informado, se não, não trocar a imagem do anúncio
    const editAd = await pool.query(
      `UPDATE anuncios SET titulo = $1, descricao = $2, preco = $3, cep = $4, logradouro = $5, numero = $6, complemento = $7, bairro = $8, cidade = $9, estado = $10 WHERE id = ${req.params['idAnuncio']}`,
      [titulo, descricao, preco, cep, logradouro, numero, complemento, bairro, cidade, estado])
    res.status(201).json("Anúncio alterado com sucesso")
  } else { // Caso as condições sejam satisfeitas, realizar a query
    const editAd = await pool.query(
      `UPDATE anuncios SET titulo = $1, descricao = $2, preco = $3, imagem = $4, cep = $5, logradouro = $6, numero = $7, complemento = $8, bairro = $9, cidade = $10, estado = $11 WHERE id = ${req.params['idAnuncio']}`,
      [titulo, descricao, preco, imagem, cep, logradouro, numero, complemento, bairro, cidade, estado])
    res.status(201).json("Anúncio alterado com sucesso")
  }
 } catch(err) {
   console.error(err.message)
   res.status(500).send("Internal server error")
 }
})

router.get("/meus-anuncios/:id", async (req, res) => {
  try {
    const fill = await pool.query(
      `SELECT id, id_anunciante, titulo, descricao, preco, imagem, cep, logradouro, numero, complemento, bairro, cidade, estado FROM anuncios WHERE id_anunciante = '${req.params['id']}'`
    );

    res.status(200).json(fill.rows);
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal server error")
  }
})

router.delete("/excluir/:id", async (req, res) => {
  try {
    // pegar o corpo da requisição
    const { user_id, user_password } = req.body

    // checar se usuário já existe
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id])

    if (user.rows.length === 0) {
        return res.status(401).json("Usuário não encontrado.")
    }

    // comparar se senha que recebeu do input é igual a do banco de dados
    const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password)

    if (!validPassword) {
        return res.status(401).json("Senha incorreta.")
    }
    const idAd = req.params['id']
    //excluir imagem do anúncio
    const fill = await pool.query(
        `SELECT imagem FROM anuncios WHERE id = ${idAd}`
    );

    const imagem = fill.rows[0].imagem
    const uploadsPath = `./public/uploads/${imagem}`; 
    fs.unlinkSync(uploadsPath);

  //excluir cadastro do anúncio
    const fill2 = await pool.query(
      `DELETE FROM anuncios WHERE id = ${idAd}`
    );

    res.status(201).json("Anúncio excluído com sucesso")
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal server error")
  }
})

module.exports = router;
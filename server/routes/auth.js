const router = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

//registering
router.post('/register', validInfo, async (req, res) => {
    try {
        // pegar o corpo da requisição (name, email, password)
        const { user_name, user_email, user_password, celular } = req.body

        // 2.check if the user exists (if exists then throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [user_email])
        if (user.rows.length !== 0) {
            return res.status(401).json('Já existe um usuário utilizando este e-mail')
        }

        // encriptar a senha
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)

        const hashedPassword = await bcrypt.hash(user_password, salt)

        // inserir usuário no banco de dados
        const newUser = await pool.query(
            'INSERT INTO users (user_name,user_email,user_password, celular) VALUES ($1,$2,$3,$4) RETURNING *',
            [user_name, user_email, hashedPassword, celular])

        // gerar o token JWT
        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({ token })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal server error')
    }
})

router.post('/login', validInfo, async (req, res) => {
    try {
        // pegar o corpo da requisição
        const { user_email, user_password } = req.body

        // checar se usuário já existe
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email])

        if (user.rows.length === 0) {
            return res.status(401).json("E-Mail ou senha incorretos")
        }

        // comparar se senha que recebeu do input é igual a do banco de dados
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password)

        if (!validPassword) {
            return res.status(401).json("E-Mail ou senha incorretos")
        }

        // entregar o token JWT
        const token = jwtGenerator(user.rows[0].user_id)
        res.json({ token })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error..')
    }
})

router.put("/user-edit/:id", async (req, res) => {
    // pegar o corpo da requisição
    const { user_name, user_email, user_password, celular } = req.body
    try {
        // checar se senha está vazia
        if(user_password != "") {
            // encriptar a senha
            const saltRound = 10
            const salt = await bcrypt.genSalt(saltRound)

            const hashedPassword = await bcrypt.hash(user_password, salt)
  
            const editUser = await pool.query(
                `UPDATE users SET user_name = $1, user_email = $2, user_password = $3, celular = $4 WHERE user_id = '${req.params['id']}'`,
                [user_name, user_email, hashedPassword, celular])
        } else {
            const editUser = await pool.query(
                `UPDATE users SET user_name = $1, user_email = $2, celular = $3 WHERE user_id = '${req.params['id']}'`,
                [user_name, user_email, celular])
        }
          res.status(201).json("Usuário alterado com sucesso")
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal server error')
    }
  })

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal server error')
    }
})

module.exports = router
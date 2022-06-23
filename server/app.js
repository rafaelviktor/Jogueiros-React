
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

//middlewares
dotenv.config({ path: "./.env" });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

//rotas registrar e login
app.use("/auth", require("./routes/auth"));

// rota home
app.use("/home", require("./routes/home"));

// rota pesquisa de anúncios
app.use("/pesquisa", require("./routes/pesquisa"));

// rota anuncios
app.use("/anuncios", require("./routes/anuncio"));

// rota reservas
app.use("/reservas", require("./routes/reserva"));

// rota anunciantes
app.use("/anunciantes", require("./routes/anunciante"));

// rota upload de imagens
app.use("/upload", require("./routes/imagesUpload"));


app.listen(5000, () => {
  console.log("API iniciada: Executando na porta 5000.");
});
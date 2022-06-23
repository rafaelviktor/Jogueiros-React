const router = require("express").Router();
const pool = require("../db");
const fs = require('fs');
const authorization = require("../middleware/authorization");
const imageController = require("../controllers/image-controller");
const imageUploader = require("../helpers/image-uploader");

router.post('/', imageUploader.upload.single('image'), imageController.upload);

router.delete('/excluir/:img', authorization, async (req, res) => {
    try {
        const uploadsPath = `./public/uploads/${req.params['img']}`; 
        fs.unlinkSync(uploadsPath);

        res.status(200).json("Imagem excluída com sucesso")
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal server error")
    }
});

module.exports = router;
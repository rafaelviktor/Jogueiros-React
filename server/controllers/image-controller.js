function upload(req, res) {
    if(req.file.filename) {
        res.status(201).json({
            message: "Imagem enviada com sucesso.",
            url: req.file.filename
        })
    } else {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    upload: upload
}
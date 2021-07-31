const express = require('express');
const fs = require('fs');
//comand to install
//npm install --save express multer cors file-extension
const multipart = require('connect-multiparty');
const path = require('path')
var app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const multiPartMiddlware = multipart({
    uploadDir: './uploads'
})

const IMG_PATH = path.resolve('./uploads')
app.post('/api/uploadFile', multiPartMiddlware, (req, res) => {
    let files = req.files;
    for (let file in files) {
        let tempath = files[file].path;
        let novoNome = path.resolve(IMG_PATH, 'teste.png');
        RenameFile(tempath, novoNome)
        res.json('Imagem foi movida')
    }
})

function RenameFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.log(err);
                return reject(null);
            }
            resolve(true);
        });
    });
}

app.listen(8001, () => {
    console.log("executando na porta 8001");
})


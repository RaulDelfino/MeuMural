const express = require('express');
const bodyParser = require("body-parser")
const router = express.Router()
const posts = require('../model/posts')

// ------- ROTAS ----------

// Get pra Buscar as informações
router.get("/all", (req, res) => {
    res.json(JSON.stringify(posts.getAll()));
})

// post para inserir as Informações no back-end
// usando o bodyParser(como Middleware) para poder pegar o req.body.title e req.body.description, que vao vim do Frontend
router.post("/new", bodyParser.json(), (req, res) =>{
    
    let title = req.body.title
    let description = req.body.description
    
    posts.newPost(title, description)
    //inserir variaveis no array de objetos

    res.send("post Adicionado!")
})

// -----------------------
router.delete("/delete/:id", (req, res) =>{
    let id = req.params.id
    posts.deletePost(id)
    res.send("deletado!")
})

router.patch("/edit/:id", bodyParser.json(), (req, res)  => {
    let id = req.params.id
    let title = req.body.title
    let description = req.body.description


    const success = posts.editPost(id, title, description)

    if (success) {
        res.send(`Post ${id} editado com sucesso!`);
    } else {
        res.status(400).send(`Não foi possível editar o post ${id}.`);
    }
})

module.exports = router
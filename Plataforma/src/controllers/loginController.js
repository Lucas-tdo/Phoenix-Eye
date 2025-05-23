var loginModel = require("../models/loginModel")

function checar(req, res) {
    var email = req.params.email
    var senha = req.params.senha
    if (email == undefined) {
        res.status(400).send("Seu email está undefined")
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined")
    } else {
        loginModel.checar(email, senha)
        .then(resposta=>{
            console.log("email checado")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

module.exports= {
    checar
}
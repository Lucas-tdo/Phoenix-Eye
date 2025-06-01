var loginModel = require("../models/loginModel")
const { checar_email } = require("./perfilController")

function checar(req, res) {
    var email = req.params.email
    var senha = req.params.senha
    if (email == undefined) {
        res.status(400).send("Seu email está undefined")
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined")
    } else {
        loginModel.checar(email, senha)
            .then(resposta => {
                console.log("email checado")
                res.json(resposta)
            })
            .catch(erro => {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            })
    }
}


function checar_orgao(req, res) {
    var email = req.params.email
    var senha = req.params.senha
    if (email == undefined) {
        res.status(400).send("Seu email está undefined")
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined")
    } else {
        loginModel.checar_orgao(email, senha)
            .then(resposta => {
                console.log("email orgão checado")
                res.json(resposta)
            })
            .catch(erro => {
                console.log(erro)
                res.status(500).json(erro.sqlMessage)
            })
    }
}

function cadastro_acesso(req, res) {
    var idUsuario = req.params.idUsuarioServer;
    var idMonitoramento = req.params.idMonitoramentoServer;
    var idOrgao = req.params.idOrgaoServer;

    loginModel.cadastro_acesso(idUsuario, idMonitoramento, idOrgao)
        .then(resultado => {
            res.json(resultado)
            console.log('Área de Monitoramento realizado com sucesso')
        })
        .catch(erro => {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage)
        })

}


module.exports = {
    checar,
    checar_orgao,
    cadastro_acesso
}
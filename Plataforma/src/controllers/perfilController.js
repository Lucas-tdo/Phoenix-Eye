var perfilModel = require("../models/perfilModel");

function cadastrar(req,res){
    var nome = req.body.nomeServer
    var email =req.body.emailServer
    var senha = req.body.senhaServer
    var id_empresa = req.body.idempresaServer
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if(id_empresa==undefined){
        res.status(400).send("Sua empresa não está cadastrada");
    }
    else{
        perfilModel.cadastrar(nome,email,senha,id_empresa)
        .then(resultado=>{
            res.json(resultado)
            console.log('Cadastro de funcionario realizado com sucesso')
        })
        .catch(erro=>{
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function listarfunc(req,res){
    var id = req.params.idOrgao
    if(id==undefined){
        res.status(400).send('O id da empresa está undefined ')
    }
    else{
        perfilModel.listarfunc(id)
        .then(resposta=>{
            console.log('Lista de funcionarios do orgão')
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}


function dadosperfil(req,res){
    var id = req.params.idOrgao
    if(id==undefined){
        res.status(400).send('O id da empresa está undefined ')
    }
    else{
        perfilModel.dadosperfil(id)
        .then(resposta=>{
            console.log("Dados do perfil localizados")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function deletar_func(req,res){
    var id = req.params.idFunc
    if(id==undefined){
        res.status(400).send('O id da empresa está undefined ')
    }
    else{
        perfilModel.deletar_func(id)
        .then(resposta=>{
            console.log(`Usuário ${id} excluido`)
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res(500).json(erro.sqlMessage)
        })
    }
}
module.exports = {
    cadastrar,
    listarfunc,
    dadosperfil,
    deletar_func
}
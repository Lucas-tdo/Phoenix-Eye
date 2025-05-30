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


function atualizar_funcionario(req,res){
    var id = req.body.idServer
    var nome = req.body.nomeServer
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    if(id==undefined){
        res.status(400).send("O id do seu usuário está undefined")
    }
    else if(nome==undefined){
        res.status(400).send("O nome do seu usuário está undefined")
    }
    else if(email==undefined){
        res.status(400).send("O email do seu usuário está undefined")
    }
    else if(senha==undefined){
        res.status(400).send("A senha do seu usuário está undefined")
    }
    else{
        perfilModel.atualizar_funcionario(nome,email,senha,id)
        .then(resposta=>{
            console.log(`O Usuário ${id} teve seus dados atualizados`)
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
        })
    }
}

function deletar_apa(req, res){

        var id_apa = req.params.id_apa;

        perfilModel.deletar_apa(id_apa)
        .then(resposta=>{
            console.log(`A apa ${id_apa} foi excluida`)
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res(500).json(erro.sqlMessage)
        })
    

}


function checar_email(req,res){
    var email = req.params.email
    if(email==undefined){
        res.status(400).send('O email está undefined')
    }
    else{
        perfilModel.checar_email(email)
        .then(resposta=>{
            console.log("Email checado")
            console.log(resposta)
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res(500).json(erro.sqlMessage)
        })
    }
}

function cadastrar_apa(req,res){
    var imagem = req.file.filename
    var nome = req.body.nome
    var id = req.body.idempresa
    perfilModel.cadastrar_apa(nome,imagem,id)
    .then(resultado=>{
        console.log("Apa cadastrada com sucesso")
        res.status(201).send("Usuario criado com sucesso")
    })
    .catch(erro=>{
        console.log(erro)
        res.status(500).send(erro.sqlMessage)
    })
}

// funcionário
function dadosperfil_func(req,res){
    var id = req.params.idFunc
    if(id==undefined){
        res.status(400).send('O id da empresa está undefined ')
    }
    else{
        perfilModel.dadosperfil_func(id)
        .then(resposta=>{
            console.log(resposta)
            console.log("Dados do funcionário localizados")
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

function listarapas(req,res){
    var id = req.params.idOrgao
    if(id==undefined){
        res.status(400).send('O id da empresa está undefined ')
    }
    else{
        perfilModel.listarapas(id)
        .then(resposta=>{
            console.log('Lista de Apas do orgão')
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}
module.exports = {
    cadastrar,
    listarfunc,
    dadosperfil,
    deletar_func,
    checar_email,
    dadosperfil_func,
    cadastrar_apa,
    listarapas,
    deletar_apa,
    atualizar_funcionario
}
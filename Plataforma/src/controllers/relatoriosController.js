var relatoriosModel= require('../models/relatoriosModels')

function devolver_mock(req, res) {
    const qtd = req.params.qtd;
    console.log('qtd: ', qtd);

    if (qtd == undefined || qtd == "") {
        res.status(400).send("Informe a quantidade!");
    }

    const dados = []
    for (let i = 0; i < qtd; i++) {
        dados.push(parseInt((Math.random() * 7 + 26))) ;
    }
    res.send(dados);
}

function listar_dados(req,res){
    var idOrgao = req.params.idOrgao
    var situacao = req.params.situacao
    var de = req.params.de
    var ate = req.params.ate
    if(idOrgao==undefined){
        res.status(400).send('O id da empresa está undefined ')
    }
    else{
        relatoriosModel.listar_dados(idOrgao,situacao,de,ate)
        .then(resposta=>{
            console.log('Dados dos sensores localizados')
            res.json(resposta)
        })
        .catch(erro=>{
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
    }
}

module.exports={
    listar_dados,
    devolver_mock
}
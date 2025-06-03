var relatoriosModel= require('../models/relatoriosModels')

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
    listar_dados
}
var medidaslModel = require("../models/medidasModel");


function receber_dados(req, res) {

    var idMonitoramento = req.params.idMonitoramento;

    medidaslModel.receber_dados(idMonitoramento).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
           res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as postagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
 
    receber_dados

}
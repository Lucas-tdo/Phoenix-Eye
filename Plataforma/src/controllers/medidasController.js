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

function dados_sensor_especifico(req, res) {

    var id_Sensor = req.params.id_Sensor;

    medidaslModel.dados_sensor_especifico(id_Sensor).then(function (resultado) {
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



function listar_apas(req, res) {

    var idOrgao = req.params.idOrgao;

    medidaslModel.listar_apas(idOrgao).then(function (resultado) {
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



function dados_monitoramento(req, res) {

    var idMonitoramento = req.params.idMonitoramento;

    medidaslModel.dados_monitoramento(idMonitoramento).then(function (resultado) {
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

function kpis_cinco_dias(req, res) {

    var idMonitoramento = req.params.idMonitoramento;

    medidaslModel.kpis_cinco_dias(idMonitoramento).then(function (resultado) {
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
    dados_sensor_especifico,
    receber_dados,
    listar_apas,
    dados_monitoramento,
    kpis_cinco_dias
}
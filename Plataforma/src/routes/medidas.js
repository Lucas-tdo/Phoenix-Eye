var express = require("express");
var router = express.Router();


var medidasController = require("../controllers/medidasController")


router.get("/receber_dados/:idMonitoramento", function (req, res) {
    medidasController.receber_dados(req, res)
})

router.get("/dados_sensor_especifico/:id_Sensor", function (req, res) {
    medidasController.dados_sensor_especifico(req, res)
})


router.get("/listar_apas/:idOrgao", function (req, res) {
    medidasController.listar_apas(req, res)
})

router.get("/dados_monitoramento/:idMonitoramento", function (req, res) {
    medidasController.dados_monitoramento(req, res)
})

router.get("/kpis_cinco_dias/:idMonitoramento", function (req, res) {
    medidasController.kpis_cinco_dias(req, res)
})


router.get("/buscar_acessos/:idOrgao", function (req, res) {
    medidasController.buscar_acessos(req, res)
})

router.get("/atualizar_ocorrencias/:id_Sensor/:limite",function(req,res){
    medidasController.atualizar_ocorrencias(req,res)
})

router.get("/verificarAviso/:idOrgao",function(req,res){
    medidasController.verificarAviso(req,res)
})



module.exports = router;

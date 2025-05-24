var express = require("express");
var router = express.Router();


var medidasController = require("../controllers/medidasController")


router.get("/receber_dados/:idMonitoramento", function(req,res){
    medidasController.receber_dados(req,res)
})

router.get("/dados_sensor_especifico/:id_Sensor", function(req,res){
    medidasController.dados_sensor_especifico(req,res)
})



module.exports = router;

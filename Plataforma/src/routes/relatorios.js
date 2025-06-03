var express = require("express");
var router = express.Router();

var RelatoriosController = require("../controllers/relatoriosController")

router.get("/listar_dados/:idOrgao/:situacao/:de/:ate",function(req,res){
    RelatoriosController.listar_dados(req,res)
})

module.exports = router;

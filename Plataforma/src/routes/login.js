var express = require("express");
var router = express.Router();
var loginController = require("../controllers/loginController")

router.get("/checar/:email/:senha", function(req,res){
    loginController.checar(req,res)
})

router.get("/checar_orgao/:email/:senha", function(req,res){
    loginController.checar_orgao(req,res)
})


router.post("/cadastro_acesso", function(req,res){
    loginController.cadastro_acesso(req,res)
})


module.exports=router;

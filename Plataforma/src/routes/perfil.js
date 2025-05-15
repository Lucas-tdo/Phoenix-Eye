var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController")

router.post("/cadastrar",function(req,res){
    perfilController.cadastrar(req,res)
})

router.post("/listarfunc/:idOrgao",function(req,res){
    perfilController.listarfunc(req,res)
})

router.get("/dadosperfil/:idOrgao",function(req,res){
    perfilController.dadosperfil(req,res)
})

router.get("/dadosperfil_func/:idFunc",function(req,res){
    perfilController.dadosperfil_func(req,res)
})

router.delete("/deletar_func/:idFunc",function(req,res){
    perfilController.deletar_func(req,res)
})

router.get("/checar_email/:email",function(req,res){
    perfilController.checar_email(req,res)
})
module.exports=router;
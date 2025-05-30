var express = require("express");
var router = express.Router();

const upload = require('../configimagens/configAPAs'); 
var perfilController = require("../controllers/perfilController")

router.post("/cadastrar",function(req,res){
    perfilController.cadastrar(req,res)
})

router.get("/listarfunc/:idOrgao",function(req,res){
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

router.post("/cadastrar_apa",upload.single('foto'),(req,res)=>{
    perfilController.cadastrar_apa(req,res)
})

router.post("/listarapas/:idOrgao",function(req,res){
    perfilController.listarapas(req,res)
})


router.delete("/deletar_apa/:id_apa", function(req,res){
    perfilController.deletar_apa(req, res)
});

router.put("/atualizar_funcionario",function(req,res){
    perfilController.atualizar_funcionario(req,res)
})

module.exports=router;
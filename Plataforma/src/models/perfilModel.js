var database = require("../database/config")

function cadastrar(nome,email,senha,id_empresa){
    var instrucaoSql = `
       insert into usuario values (default,'${nome}','${email}','${senha}',1,${id_empresa});  
    `;
    return database.executar(instrucaoSql);
}

function listarfunc(id){
    var instrucaoSql = `
        select * from usuario where fkOrgao = ${id} order by idusuario desc;
    `;
    return database.executar(instrucaoSql);
}

function  dadosperfil(id){
    var instrucaoSql = `
        select orgao,cnpj,telefone,email from orgao where idOrgao=${id};
    `;
    return database.executar(instrucaoSql);
}
module.exports = {
    cadastrar,
    listarfunc,
    dadosperfil
}


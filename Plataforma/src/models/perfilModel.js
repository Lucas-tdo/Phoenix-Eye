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

function  dadosperfil_func(id){
    var instrucaoSql = `
        select u.nome,u.email,u.senha,u.nivelUsuario,o.orgao from usuario u
        join orgao o on
        fkOrgao=idOrgao where idusuario=${id};
    `;
    return database.executar(instrucaoSql);
}

function deletar_func(id){
    var instrucaoSql = `
        delete from usuario where idusuario=${id};
    `;
    return database.executar(instrucaoSql);
}

function checar_email(email){
    var instrucaoSql = `
        select * from usuario where email='${email}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar_apa(nome,imagem,id){
    var instrucaoSql = `
        insert into Monitoramento values (default,'${nome}','../dashboard/Assets/APAs/${imagem}','Em análise',${id});
    `;
    return database.executar(instrucaoSql);
}

function listarapas(id){
    var instrucaoSql = `
        select * from Monitoramento where FkOrgao=${id};
    `;
    return database.executar(instrucaoSql);
}
module.exports = {
    cadastrar,
    listarfunc,
    dadosperfil,
    deletar_func,
    checar_email,
    dadosperfil_func,
    cadastrar_apa,
    listarapas
}


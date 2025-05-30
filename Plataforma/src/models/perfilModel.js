var database = require("../database/config")

function cadastrar(nome,email,senha,id_empresa){
    var instrucaoSql = `
       insert into Usuario values (default,'${nome}','${email}','${senha}',2,${id_empresa});  
    `;
    return database.executar(instrucaoSql);
}

function listarfunc(id){
    var instrucaoSql = `
        select * from Usuario where fkOrgao = ${id} order by idUsuario desc;
    `;
    return database.executar(instrucaoSql);
}

function  dadosperfil(id){
    var instrucaoSql = `
        select orgao,cnpj,telefone,email from Orgao where idOrgao=${id};
    `;
    return database.executar(instrucaoSql);
}

function  dadosperfil_func(id){
    var instrucaoSql = `
        select u.nome,u.email,u.senha,u.nivelUsuario,o.orgao from Usuario u
        join Orgao o on
        fkOrgao=idOrgao where idUsuario=${id};
    `;
    return database.executar(instrucaoSql);
}

function deletar_func(id){
    var instrucaoSql = `
        delete from Usuario where idUsuario=${id};
    `;
    return database.executar(instrucaoSql);
}

function deletar_apa(id_apa){
    var instrucaoSql = `
        delete from Monitoramento where idMonitoramento=${id_apa};
    `;
    console.log("Apa foi excluida")

    return database.executar(instrucaoSql);
}


function checar_email(email){
    var instrucaoSql = `
        select * from Usuario where email='${email}';
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
    listarapas,
    deletar_apa
}


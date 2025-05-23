var database = require("../database/config")

function checar(email,senha){
    var instrucaoSql = `
        select * from usuario where email = '${email}' and senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function checar_orgao(email,senha){
    var instrucaoSql = `
        select * from orgao where email = '${email}' and senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    checar,
    checar_orgao
}
var database = require("../database/config")

function cadastrar(nome, email, senha, id_empresa) {
    var instrucaoSql = `
       insert into Usuario values (default,'${nome}','${email}','${senha}',2,${id_empresa});  
    `;
    return database.executar(instrucaoSql);
}

function listarfunc(id) {
    var instrucaoSql = `
        select * from Usuario where fkOrgao = ${id} order by idUsuario desc;
    `;
    return database.executar(instrucaoSql);
}

function dadosperfil(id) {
    var instrucaoSql = `
        select orgao,cnpj,telefone,email from Orgao where idOrgao=${id};
    `;
    return database.executar(instrucaoSql);
}

function dadosperfil_func(id) {
    var instrucaoSql = `
        select u.nome,u.email,u.senha,u.nivelUsuario,o.orgao from Usuario u
        left join Orgao o on
        fkOrgao=idOrgao where idUsuario=${id};
    `;
    return database.executar(instrucaoSql);
}

function deletar_func(id) {
    var instrucaoSql = `
        DELETE FROM Acesso WHERE fkUsuario = ${id};
    `;
    var instrucaoSql2 = `
        delete from Usuario where idUsuario=${id};
    `;
    return database.executar(instrucaoSql).then(() => {
        return database.executar(instrucaoSql2);
    })
}

function atualizar_funcionario(nome, email, senha, id) {
    var instrucaoSql = `
        update Usuario set nome="${nome}",email="${email}",senha="${senha}" where idUsuario=${id};
    `;
    return database.executar(instrucaoSql);
}

function deletar_apa(id_apa) {
    var instrucaoSql = `
        delete from Acesso where fkMonitoramento=${id_apa};
    `;
    var instrucaoSql2 = `
    delete from Monitoramento where idMonitoramento=${id_apa};
    `
    return database.executar(instrucaoSql).then(() => {
        return database.executar(instrucaoSql2);
    })

}




function checar_email(email) {
    var instrucaoSql = `
        select * from Usuario where email='${email}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar_apa(nome, imagem, id) {
    var instrucaoSql = `
        insert into Monitoramento values (default,'${nome}','../dashboard/Assets/APAs/${imagem}','Em análise',${id});
    `;

    var instrucaoSql2 = `
    INSERT INTO Area VALUES
       
        (DEFAULT, 'A', 1, ${id}), (DEFAULT, 'A', 2, ${id}), (DEFAULT, 'A', 3, ${id}),
        (DEFAULT, 'A', 4, ${id}), (DEFAULT, 'A', 5, ${id}), (DEFAULT, 'A', 6, ${id}),
        (DEFAULT, 'A', 7, ${id}), (DEFAULT, 'A', 8, ${id}), (DEFAULT, 'A', 9, ${id}),


        (DEFAULT, 'B', 1, ${id}), (DEFAULT, 'B', 2, ${id}), (DEFAULT, 'B', 3, ${id}),
        (DEFAULT, 'B', 4, ${id}), (DEFAULT, 'B', 5, ${id}), (DEFAULT, 'B', 6, ${id}),
        (DEFAULT, 'B', 7, ${id}), (DEFAULT, 'B', 8, ${id}), (DEFAULT, 'B', 9, ${id}),


        (DEFAULT, 'C', 1, ${id}), (DEFAULT, 'C', 2, ${id}), (DEFAULT, 'C', 3, ${id}),
        (DEFAULT, 'C', 4, ${id}), (DEFAULT, 'C', 5, ${id}), (DEFAULT, 'C', 6, ${id}),
        (DEFAULT, 'C', 7, ${id}), (DEFAULT, 'C', 8, ${id}), (DEFAULT, 'C', 9, ${id}),


        (DEFAULT, 'D', 1, ${id}), (DEFAULT, 'D', 2, ${id}), (DEFAULT, 'D', 3, ${id}),
        (DEFAULT, 'D', 4, ${id}), (DEFAULT, 'D', 5, ${id}), (DEFAULT, 'D', 6, ${id}),
        (DEFAULT, 'D', 7, ${id}), (DEFAULT, 'D', 8, ${id}), (DEFAULT, 'D', 9, ${id}),


        (DEFAULT, 'E', 1, ${id}), (DEFAULT, 'E', 2, ${id}), (DEFAULT, 'E', 3, ${id}),
        (DEFAULT, 'E', 4, ${id}), (DEFAULT, 'E', 5, ${id}), (DEFAULT, 'E', 6, ${id}),
        (DEFAULT, 'E', 7, ${id}), (DEFAULT, 'E', 8, ${id}), (DEFAULT, 'E', 9, ${id}),

        (DEFAULT, 'F', 1, ${id}), (DEFAULT, 'F', 2, ${id}), (DEFAULT, 'F', 3, ${id}),
        (DEFAULT, 'F', 4, ${id}), (DEFAULT, 'F', 5, ${id}), (DEFAULT, 'F', 6, ${id}),
        (DEFAULT, 'F', 7, ${id}), (DEFAULT, 'F', 8, ${id}), (DEFAULT, 'F', 9, ${id}),

     
        (DEFAULT, 'G', 1, ${id}), (DEFAULT, 'G', 2, ${id}), (DEFAULT, 'G', 3, ${id}),
        (DEFAULT, 'G', 4, ${id}), (DEFAULT, 'G', 5, ${id}), (DEFAULT, 'G', 6, ${id}),
        (DEFAULT, 'G', 7, ${id}), (DEFAULT, 'G', 8, ${id}), (DEFAULT, 'G', 9, ${id}),

        (DEFAULT, 'H', 1, ${id}), (DEFAULT, 'H', 2, ${id}), (DEFAULT, 'H', 3, ${id}),
        (DEFAULT, 'H', 4, ${id}), (DEFAULT, 'H', 5, ${id}), (DEFAULT, 'H', 6, ${id}),
        (DEFAULT, 'H', 7, ${id}), (DEFAULT, 'H', 8, ${id}), (DEFAULT, 'H', 9, ${id}),


        (DEFAULT, 'I', 1, ${id}), (DEFAULT, 'I', 2, ${id}), (DEFAULT, 'I', 3, ${id}),
        (DEFAULT, 'I', 4, ${id}), (DEFAULT, 'I', 5, ${id}), (DEFAULT, 'I', 6, ${id}),
        (DEFAULT, 'I', 7, ${id}), (DEFAULT, 'I', 8, ${id}), (DEFAULT, 'I', 9, ${id});

    `;

    var instrucaoSql3 = `
        INSERT INTO Sensor VALUES
        
        (DEFAULT, 'A1-${id}', 'Ativo', 1),
        (DEFAULT, 'A2-${id}', 'Ativo', 2),
        (DEFAULT, 'A3-${id}', 'Ativo', 3),
        (DEFAULT, 'A4-${id}', 'Ativo', 4),
        (DEFAULT, 'A5-${id}', 'Ativo', 5),
        (DEFAULT, 'A6-${id}', 'Ativo', 6),	
        (DEFAULT, 'A7-${id}', 'Ativo', 7),
        (DEFAULT, 'A8-${id}', 'Ativo', 8),
        (DEFAULT, 'A9-${id}', 'Ativo', 9),

        (DEFAULT, 'B1-${id}', 'Ativo', 10),
        (DEFAULT, 'B9-${id}', 'Ativo', 18),

        (DEFAULT, 'C1-${id}', 'Ativo', 19),
        (DEFAULT, 'C9-${id}', 'Ativo', 27),

        (DEFAULT, 'D1-${id}', 'Ativo', 28),
        (DEFAULT, 'D9-${id}', 'Ativo', 36),

        (DEFAULT, 'E1-${id}', 'Ativo', 37),
        (DEFAULT, 'E9-${id}', 'Ativo', 45),

        (DEFAULT, 'F1-${id}', 'Ativo', 46),
        (DEFAULT, 'F9-${id}', 'Ativo', 54),

        (DEFAULT, 'G1-${id}', 'Ativo', 55),
        (DEFAULT, 'G9-${id}', 'Ativo', 63),

        (DEFAULT, 'H1-${id}', 'Ativo', 64),
        (DEFAULT, 'H9-${id}', 'Ativo', 72),

        (DEFAULT, 'I1-${id}', 'Ativo', 73),
        (DEFAULT, 'I2-${id}', 'Ativo', 74),
        (DEFAULT, 'I3-${id}', 'Ativo', 75),
        (DEFAULT, 'I4-${id}', 'Ativo', 76),
        (DEFAULT, 'I5-${id}', 'Ativo', 77),
        (DEFAULT, 'I6-${id}', 'Ativo', 78),
        (DEFAULT, 'I7-${id}', 'Ativo', 79),
        (DEFAULT, 'I8-${id}', 'Ativo', 80),
        (DEFAULT, 'I9-${id}', 'Ativo', 81);

    `;
    return database.executar(instrucaoSql).then(() => {
        return database.executar(instrucaoSql2);
    }).then(() => {
        return database.executar(instrucaoSql3);
    })
}

function listarapas(id) {
    var instrucaoSql = `
        select * from Monitoramento where FkOrgao=${id};
    `;
    return database.executar(instrucaoSql);
}

function listarorgao() {
    var instrucaoSql = `
        select * from Orgao;
    `;
    return database.executar(instrucaoSql);
}


function listar_solicitacao() {
    var instrucaoSql = `
        SELECT Nome_Atribuido, Imagem, Status_Monitoramento,FkOrgao,idMonitoramento, Orgao.orgao
FROM Monitoramento JOIN Orgao ON Orgao.idOrgao = Monitoramento.FkOrgao 
WHERE Status_Monitoramento = "Em análise";
    `;
    return database.executar(instrucaoSql);

}

function atualizar_monitoramento(idMonitoramento, situacao) {
    var instrucaoSql = `
       UPDATE Monitoramento SET Status_Monitoramento = "${situacao}" WHERE idMonitoramento = ${idMonitoramento};

    `;
    return database.executar(instrucaoSql);

}

function cadastrar_orgao(nome, telefone, cnpj, email, senha) {
    var instrucaoSql = `
       insert into Orgao values
        (default,'${nome}','${cnpj}','${telefone}','${email}','${senha}');
    `;
    return database.executar(instrucaoSql);
}

function deletar_orgao(id_orgao) {
    var instrucaoSql = `
       delete from Orgao where idOrgao=${id_orgao};
    `;
    return database.executar(instrucaoSql);
}

function listar_todas_apas() {
    var instrucaoSql = `
       select m.idMonitoramento,m.Nome_Atribuido,m.Imagem,m.Status_Monitoramento,o.orgao from Monitoramento m 
        join Orgao o on
        idOrgao=fkOrgao;

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
    deletar_apa,
    atualizar_funcionario,
    listarorgao,
    listar_solicitacao,
    atualizar_monitoramento,
    cadastrar_orgao,
    deletar_orgao,
    listar_todas_apas
}


var database = require("../database/config")


function receber_dados(idMonitoramento) {

    var instrucaoSql = `
SELECT 
    Sensor.idSensor AS ID,
    Sensor.nome AS Nome_Sensor,
    Sensor.status_sensor,
    Dados.temperatura,
    Dados.umidade,
    Dados.dtMedicao,
    Dados.Situacao_dado AS Situacao
FROM Sensor 
JOIN (
    SELECT d1.*
    FROM Dados as d1
     JOIN (
        SELECT fkSensor, MAX(idDados) AS maxId
        FROM Dados
        GROUP BY fkSensor
    ) d2 ON d1.fkSensor = d2.fkSensor AND d1.idDados = d2.maxId
) AS Dados ON Dados.fkSensor = Sensor.idSensor
JOIN Area ON Sensor.fkArea = Area.idArea 
JOIN Monitoramento ON Monitoramento.idMonitoramento = Area.FkMonitoramento
WHERE Monitoramento.idMonitoramento = ${idMonitoramento};

    `;
    console.log("Selecionando dados do sensor no banco de dados");
    return database.executar(instrucaoSql)

}

function dados_sensor_especifico(id_Sensor) {
    var instrucaoSql = `
    
    SELECT Sensor.nome ,Dados.temperatura, Dados.umidade ,Dados.dtMedicao , Dados.Situacao_dado, Sensor.status_sensor
    FROM Sensor JOIN Dados ON Dados.fkSensor = Sensor.idSensor WHERE Sensor.idSensor = ${id_Sensor} ORDER BY Dados.dtMedicao DESC LIMIT 1;
    `;

    console.log("Selecionando dados do sensor no banco de dados");
    return database.executar(instrucaoSql)
}


function listar_apas(idOrgao) {
    var instrucaoSql = `
    
  SELECT * FROM Monitoramento WHERE FkOrgao = ${idOrgao} AND Status_Monitoramento = "Aprovado"
    `;

    console.log("Selecionando dados do sensor no banco de dados");
    return database.executar(instrucaoSql)
}


function dados_monitoramento(idMonitoramento) {
    var instrucaoSql = `
    
        SELECT * FROM Monitoramento WHERE idMonitoramento = ${idMonitoramento};
    `;

    console.log("Selecionando dados do sensor no banco de dados");
    return database.executar(instrucaoSql)
}


function kpis_cinco_dias(idMonitoramento) {
    var instrucaoSql = `
    SELECT 
    DATE(dtMedicao) AS dia,
    SUM(CASE WHEN Situacao_dado = 'Alerta' THEN 1 ELSE 0 END) AS alertas,
    SUM(CASE WHEN Situacao_dado = 'Perigo' THEN 1 ELSE 0 END) AS perigos,
    SUM(CASE WHEN Situacao_dado = 'Incêndio' THEN 1 ELSE 0 END) AS incendios
    FROM Dados JOIN Sensor ON Sensor.idSensor = Dados.fkSensor 
    JOIN Area ON Sensor.fkArea = Area.idArea JOIN Monitoramento ON Monitoramento.idMonitoramento= 
    Area.fkMonitoramento
    WHERE dtMedicao >= CURDATE() - INTERVAL 4 DAY AND Monitoramento.idMonitoramento = ${idMonitoramento}
    GROUP BY DATE(dtMedicao)
    ORDER BY dia DESC;
    `;

    console.log("Selecionando dados do sensor no banco de dados");
    return database.executar(instrucaoSql)
}


function buscar_acessos(idOrgao) {
    var instrucaoSql = `
        SELECT Usuario.nome, Monitoramento.Nome_Atribuido ,DATE_FORMAT(Acesso.dataAcesso, '%d/%m/%Y %H:%i') AS "Data"
        FROM Acesso JOIN Monitoramento ON fkMonitoramento = Monitoramento.idMonitoramento
        JOIN Usuario ON fkUsuario = Usuario.idUsuario 
        JOIN Orgao  ON Usuario.fkOrgao = Orgao.idOrgao 
        WHERE Usuario.fkOrgao = ${idOrgao} ORDER BY Acesso.dataAcesso DESC; 
    `;

    console.log("Selecionando dados do sensor no banco de dados");
    return database.executar(instrucaoSql)
}

module.exports = {
    receber_dados,
    dados_sensor_especifico,
    listar_apas,
    dados_monitoramento,
    kpis_cinco_dias,
    buscar_acessos
}

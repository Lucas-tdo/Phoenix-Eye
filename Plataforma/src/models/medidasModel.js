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

function dados_sensor_especifico(id_Sensor){
    var instrucaoSql = `
    
    SELECT Sensor.nome ,Dados.temperatura, Dados.umidade ,Dados.dtMedicao , Dados.Situacao_dado, Sensor.status_sensor
    FROM Sensor JOIN Dados ON Dados.fkSensor = Sensor.idSensor WHERE Sensor.idSensor = ${id_Sensor} ORDER BY Dados.dtMedicao DESC;
    `;

    console.log("Selecionando dados do sensor no banco de dados");
    return database.executar(instrucaoSql)
}


module.exports = {
    receber_dados,
    dados_sensor_especifico

}

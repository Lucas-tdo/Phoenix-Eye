var database = require("../database/config")


function receber_dados(idMonitoramento) {

    var instrucaoSql = `
SELECT 
    Sensor.idSensor AS ID,
    Sensor.nome AS Nome_Sensor,
    Sensor.status_sensor,
    Dados.temperatura,
    Dados.umidade
FROM Sensor 
JOIN Dados ON Dados.fkSensor = Sensor.idSensor 
JOIN Area ON Sensor.fkArea = Area.idArea 
JOIN Monitoramento ON Monitoramento.idMonitoramento = Area.FkMonitoramento
WHERE Sensor.status_sensor = 'Ativo' AND Monitoramento.idMonitoramento = ${idMonitoramento};

    `;
    console.log("Executando a instrução do SQL : \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}

module.exports = {
    receber_dados

}

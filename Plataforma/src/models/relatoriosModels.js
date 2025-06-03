var database = require("../database/config")

function listar_dados(id,situacao,de,ate){
    if(situacao=="Todos" && de=="vazio" && ate=="vazio"){
        var instrucaoSql = `
           select d.temperatura,d.dtMedicao,d.umidade,d.Situacao_dado,s.nome,a.Fkmonitoramento from Dados d join Sensor s on 
        d.FkSensor=s.idSensor 
        join Area a on
        s.fkArea= a.idArea
        where a.FkMonitoramento=${id}
        order by dtMedicao desc limit 100 ;
        `;
    }
    else if(situacao=="Todos" && de!="vazio" && ate!="vazio"){
        var instrucaoSql = `
           select d.temperatura,d.dtMedicao,d.umidade,d.Situacao_dado,s.nome,a.Fkmonitoramento from Dados d join Sensor s on 
        d.FkSensor=s.idSensor 
        join Area a on
        s.fkArea= a.idArea
        where a.FkMonitoramento=${id} and d.dtMedicao between date("${de}") and date("${ate}")+interval 1 day
        order by dtMedicao desc limit 100 ;
        `;
    }
    else{
        if(de!="vazio" && ate!="vazio"){
            var instrucaoSql = `
           select d.temperatura,d.dtMedicao,d.umidade,d.Situacao_dado,s.nome,a.Fkmonitoramento from Dados d join Sensor s on 
            d.FkSensor=s.idSensor 
            join Area a on
            s.fkArea= a.idArea
            where a.FkMonitoramento=${id} and d.Situacao_dado="${situacao}" and d.dtMedicao between date("${de}") and date("${ate}")+interval 1 day
            order by dtMedicao desc limit 100 ;
            `;
        }
        else{
            var instrucaoSql = `
           select d.temperatura,d.dtMedicao,d.umidade,d.Situacao_dado,s.nome,a.Fkmonitoramento from Dados d join Sensor s on 
            d.FkSensor=s.idSensor 
            join Area a on
            s.fkArea= a.idArea
            where a.FkMonitoramento=${id} and d.Situacao_dado="${situacao}"
            order by dtMedicao desc limit 100 ;
            `;
        }
    }
    return database.executar(instrucaoSql);
    
}

module.exports={
    listar_dados
}

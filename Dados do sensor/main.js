// importa os bibliotecas necessários

const express = require('express');
const mysql = require('mysql2');


// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    valoresSensorTemp,
    valoresSensorUmid,
) => {
// conexão com o banco de dados MySQL
let poolBancoDados = mysql.createPool(
    {
        host: '192.168.1.10',
        user: 'phoenix-eye',
        password: '@Urubu100',
        database: 'PhoenixEye',
        port: 3307
    }
).promise();

// lista as portas seriais disponíveis e procura pelo Arduino



// processa os dados recebidos do Arduino


// armazena os valores dos sensores nos arrays correspondentes

valoresSensorTemp.push(2222);
   valoresSensorUmid.push(3333);

// insere os dados no banco de dados (se habilitado)
if (HABILITAR_OPERACAO_INSERIR) {
    for(var c = 0 ;c <30 ; c++ ){

    
    // este insert irá inserir os dados na tabela "medida"
    await poolBancoDados.execute(
        `INSERT INTO Dados VALUES (DEFAULT, ?, ?, DEFAULT, 1, 1)`,
        [20.0, 50]
    );
    console.log("valores inseridos no banco: ", 20.0 + ", " + 50);

    // Sensores fictícios (idSensor de 2 até 35)
    for (var idSensor = 2; idSensor <= 32; idSensor++) {
        // Geração de valores aleatórios
        const temperaturaFake = parseFloat((Math.random() * 10 + 20).toFixed(1)); // entre 20.0 e 30.0
        const umidadeFake = parseFloat((Math.random() * 20 + 60).toFixed(1));     // entre 60.0 e 80.0

        // Inserção no banco
        await poolBancoDados.execute(
            `INSERT INTO Dados VALUES (DEFAULT, ?, ?, DEFAULT, 1, ?)`,
            [temperaturaFake, umidadeFake, idSensor]
        );
    }
    console.log("Valores reais e simulados inseridos no banco com sucesso.");
}

}}


// função para criar e configurar o servidor web
const servidor = (
    valoresSensorTemp,
    valoresSensorUmid
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/temperatura', (_, response) => {
        return response.json(valoresSensorTemp);
    });
    app.get('/sensores/umidade', (_, response) => {
        return response.json(valoresSensorUmid);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorTemp = [];
    const valoresSensorUmid = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorTemp,
        valoresSensorUmid
    );

    // inicia o servidor web
    servidor(
        valoresSensorTemp,
        valoresSensorUmid
    );
})();
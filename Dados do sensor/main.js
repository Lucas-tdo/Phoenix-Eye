// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

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
            host: '10.18.33.58',
            user: 'phoenix-eye',
            password: '@Urubu100',
            database: 'PhoenixEye',
            port: 3307  
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const sensorTemp = parseFloat(valores[0]);
        const sensorUmid = parseFloat(valores[1]);

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorTemp.push(sensorUmid);
        valoresSensorUmid.push(sensorTemp);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                `INSERT INTO dados VALUES (DEFAULT,?,?,DEFAULT,?,?)`,
                [sensorTemp, sensorUmid, 1, 1]
            );
            console.log("valores inseridos no banco: ", sensorUmid + ", " + sensorTemp);


            // Sensor real (idSensor = 1)
            await poolBancoDados.execute(
                `INSERT INTO dados VALUES (DEFAULT, ?, ?, DEFAULT, 1, 1)`,
                [sensorTemp, sensorUmid]
            );

            // Sensores fictícios (idSensor de 2 até 35)
            for (let idSensor = 2; idSensor <= 35; idSensor++) {
                // Geração de valores aleatórios
                const temperaturaFake = parseFloat((Math.random() * 10 + 20).toFixed(1)); // entre 20.0 e 30.0
                const umidadeFake = parseFloat((Math.random() * 20 + 60).toFixed(1));     // entre 60.0 e 80.0

                // Inserção no banco
                await poolBancoDados.execute(
                    `INSERT INTO dados VALUES (DEFAULT, ?, ?, DEFAULT, ?, 1)`,
                    [temperaturaFake, umidadeFake, idSensor]    
                );
            }
            console.log("Valores reais e simulados inseridos no banco com sucesso.");


        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

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
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

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
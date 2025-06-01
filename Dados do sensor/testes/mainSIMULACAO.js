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
            host: 'localhost',
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
        for (var c = 0; c < 2; c++) {


            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                `INSERT INTO Dados VALUES (DEFAULT, ?, ?, DEFAULT, 1,  ?)`,
                [20.0, 50, "Normal"]
            );
            console.log("valores inseridos no banco: ", 20.0 + ", " + 50);

            // Sensores fictícios (idSensor de 2 até 35)
            for (let idSensor = 2; idSensor < 33; idSensor++) {
                // Geração de valores aleatórios

                var situacao = "";
                // Sorteia a situação
                const sorteio = Math.random();
                let temperaturaFake, umidadeFake;

                if (sorteio < 0.84) { // 84% Normal
                    temperaturaFake = parseFloat(((Math.random() * 6) + 27).toFixed(1));
                    umidadeFake = parseFloat(((Math.random() * 40) + 41).toFixed(1));
                    situacao = "Normal";
                } else if (sorteio < 0.94) { // 10% Alerta
                    temperaturaFake = parseFloat(((Math.random() * 4) + 34).toFixed(1));
                    umidadeFake = parseFloat(((Math.random() * 20) + 21).toFixed(1));
                    situacao = "Alerta";
                } else if (sorteio < 0.99) { // 5% Perigo
                    temperaturaFake = parseFloat(((Math.random() * 3) + 39).toFixed(1));
                    umidadeFake = parseFloat(((Math.random() * 19) + 1).toFixed(1));
                    situacao = "Perigo";
                } else { // 1% Incêndio
                    temperaturaFake = parseFloat(((Math.random() * 5) + 48).toFixed(1));
                    umidadeFake = parseFloat(((Math.random() * 10) + 10).toFixed(1));
                    situacao = "Incêndio";
                }


                const diaHoje = new Date();

                const ano = 2025;

                var mes = (Math.random() * 5 + 1).toFixed(0);
                if (mes < 10) {
                    mes = '0' + mes;
                }

                var dia = (Math.random() * 29 + 1).toFixed(0);
                if (dia < 10) {
                    dia = '0' + dia;
                }


                
                if (parseInt(mes) > (diaHoje.getMonth() + 1) && parseInt(dia) > diaHoje.getDate()) {
                    dia = diaHoje.getDate().toFixed(0);
                    mes = (diaHoje.getMonth() + 1).toFixed(0);
                }

                if ((mes == '02' && dia == '29') || (mes == '02' && dia == '30')) {
                    dia = '28';
                }

                var hora = (Math.random() * 23).toFixed(0);
                if (hora < 10) {
                    hora = '0' + hora;
                }

                var minuto = (Math.random() * 59).toFixed(0);
                if (minuto < 10) {
                    minuto = '0' + minuto;
                }

                var segundo = (Math.random() * 59).toFixed(0);
                if (segundo < 10) {
                    segundo = '0' + segundo;
                }

                const dataFormatada = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;

                // Só insere se a data gerada for menor ou igual à data/hora atual
                const dataGerada = new Date(`${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}`);
                const agora = new Date();
                if (dataGerada <= agora) {
         
                    console.log(`Sensor: ${idSensor}, Data: ${dataFormatada}, Temp: ${temperaturaFake}, Umid: ${umidadeFake}, Situação: ${situacao}`);

                    await poolBancoDados.execute(
                        `INSERT INTO Dados VALUES (DEFAULT, ?, ?, ?, ?, ?)`,
                        [temperaturaFake, umidadeFake, dataFormatada, idSensor, situacao]
                    );
                }
            }
            console.log("Valores reais e simulados inseridos no banco com sucesso.");
        }

    }
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

    // inicia o servidor web
    servidor(
        valoresSensorTemp,
        valoresSensorUmid
    );

    // chama a função serial a cada 10 segundos (10000 ms)
    setInterval(async () => {
        await serial(
            valoresSensorTemp,
            valoresSensorUmid
        );
    }, 3000);

})();

CREATE DATABASE PhoenixEye;
USE PhoenixEye;

-- Tabela orgao
CREATE TABLE orgao (
    idOrgao INT PRIMARY KEY AUTO_INCREMENT,
    orgao VARCHAR(45),
    cnpj CHAR(14),
    telefone CHAR(11),
    email VARCHAR(45),
    senha VARCHAR(20)
);

-- Tabela usuario
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(20),
    nivelUsuario INT,
    fkOrgao INT,
    CONSTRAINT fkOrganizacao FOREIGN KEY (fkOrgao) REFERENCES orgao(idOrgao)
);

-- Tabela area
CREATE TABLE area (
    idArea INT PRIMARY KEY AUTO_INCREMENT,
    grid CHAR(1),
    numero INT
);

-- Tabela monitoramento
CREATE TABLE monitoramento (
    fkOrgao INT,
    fkArea INT,
    responsavel VARCHAR(45),
    PRIMARY KEY (fkOrgao, fkArea),
    CONSTRAINT fkOrgaoArea FOREIGN KEY (fkOrgao) REFERENCES orgao(idOrgao),
    CONSTRAINT fkAreaMonitor FOREIGN KEY (fkArea) REFERENCES area(idArea)
);

-- Tabela sensor
CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    status_sensor VARCHAR(20),
    fkArea INT,
    CONSTRAINT fkSensorArea FOREIGN KEY (fkArea) REFERENCES area(idArea)
);

-- Tabela dados
CREATE TABLE dados (
    idDados INT AUTO_INCREMENT,
    temperatura DECIMAL(4,2),
    umidade INT,
    dtMedicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    nivelRisco INT,
    fkSensor INT,
    PRIMARY KEY (idDados, fkSensor),
    CONSTRAINT fkSensorDados FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);




-- Inserindo um orgão
INSERT INTO orgao VALUES 
(DEFAULT, 'Corpo de Bombeiros', '12345678000199', '11999998888', 'Corpodebombeiro@gov.br', 'Urubu100@');

-- Inserindo usuários
INSERT INTO usuario VALUES 
(DEFAULT, 'Guilherme', 'guilhermeM@sptech.school', 'senha_133', 1, 1),
(DEFAULT, 'Juan', 'juanviera@sptech.school', 'Urubu100@', 2, 1);

-- Inserindo áreas
INSERT INTO area VALUES
(DEFAULT, 'A', 1),
(DEFAULT, 'A', 2),
(DEFAULT, 'A', 3),
(DEFAULT, 'A', 4),
(DEFAULT, 'A', 5);

-- Inserindo sensores
INSERT INTO sensor VALUES
(DEFAULT, 'DHT11', 'Ativo', 1),
(DEFAULT, 'DHT11', 'Inativo', 2);

-- Inserindo dados
INSERT INTO dados VALUES 
(DEFAULT, 25.5, 75, DEFAULT, 1, 1),
(DEFAULT, 28.7, 70, DEFAULT, 2, 2);




-- Visualizar todos os órgãos
SELECT * FROM orgao;

-- Visualizar todos os usuários
SELECT * FROM usuario;

-- Visualizar grid das áreas
SELECT idArea, CONCAT(grid, numero) AS Grid FROM area;

-- Visualizar todos os sensores
SELECT * FROM sensor;

-- Visualizar todos os dados captados
SELECT * FROM dados;

-- Visualizar funcionários e seu órgão associado
SELECT 
    usuario.nome AS Nome_Funcionario, 
    orgao.orgao AS Orgao_Vinculado 
FROM usuario 
JOIN orgao ON usuario.fkOrgao = orgao.idOrgao;

-- Mostrar sensores ativos e seu grid
SELECT 
    sensor.idSensor,
    sensor.nome AS nome_sensor,
    sensor.status_sensor,
    CONCAT(area.grid, area.numero) AS Grid
FROM sensor 
JOIN area ON sensor.fkArea = area.idArea 
WHERE sensor.status_sensor = 'Ativo';

-- Visualizar dados de sensores ativos
SELECT 
    sensor.idSensor AS ID,
    sensor.nome AS Nome_Sensor,
    sensor.status_sensor,
    dados.temperatura,
    dados.umidade
FROM sensor 
JOIN dados ON dados.fkSensor = sensor.idSensor
WHERE sensor.status_sensor = 'Ativo';

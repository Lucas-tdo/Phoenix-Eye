CREATE DATABASE PhoenixEye;
USE PhoenixEye;
DROP DATABASE PhoenixEye;

CREATE TABLE Orgao (
    idOrgao INT PRIMARY KEY AUTO_INCREMENT,
    orgao VARCHAR(45) NOT NULL,
    cnpj CHAR(15) NOT NULL,
    telefone CHAR(11) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(20) NOT NULL
);

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    nivelUsuario TINYINT NOT NULL,
    fkOrgao INT,
    FOREIGN KEY (fkOrgao) REFERENCES Orgao(idOrgao)
);

CREATE TABLE Monitoramento (
    idMonitoramento INT AUTO_INCREMENT,
    Nome_Atribuido VARCHAR(45) NOT NULL,
    Imagem VARCHAR(255) NOT NULL,
    Status_Monitoramento VARCHAR(45) NOT NULL,
    FkOrgao INT NOT NULL,
    CONSTRAINT Validacao_Status CHECK (Status_Monitoramento in ('Aprovado' , 'Reprovado' , 'Em análise')),
    CONSTRAINT Chave_composta_monitoramento PRIMARY KEY (idMonitoramento, FkOrgao),
    CONSTRAINT Fk_Orgao_Monitoramento FOREIGN KEY (FkOrgao) REFERENCES Orgao(idOrgao)
);
INSERT INTO Monitoramento VALUES
(DEFAULT , 'Area Verde 3' ,'Sem imagem' ,'Aprovado' , 1);
CREATE TABLE Area (
    idArea INT AUTO_INCREMENT,
    grid CHAR(1) NOT NULL,
    numero INT NOT NULL,
    FkMonitoramento INT NOT NULL,
    CONSTRAINT Fk_Monitoramento_Area FOREIGN KEY (FkMonitoramento) REFERENCES Monitoramento(idMonitoramento),
    CONSTRAINT Chave_Composta_Area PRIMARY KEY (idArea, FkMonitoramento)
);

CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    status_sensor VARCHAR(20),
    fkArea INT,
    FOREIGN KEY (fkArea) REFERENCES Area(idArea)
);

CREATE TABLE Dados (
    idDados INT AUTO_INCREMENT PRIMARY KEY,
    temperatura DECIMAL(4,2) ,
    umidade INT,
    dtMedicao DATETIME DEFAULT CURRENT_TIMESTAMP(),
    nivelRisco INT,
    fkSensor INT,
    CONSTRAINT Fk_Sensor_Dados FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

TRUNCATE Dados;
Select * from Dados;


-- Inserindo um orgão
INSERT INTO Orgao VALUES 
(DEFAULT, 'Corpo de Bombeiros', '12345678000199', '11999998888', 'Corpodebombeiro@gov.br', 'Urubu100@');

-- Inserindo usuários
INSERT INTO Usuario VALUES 
(DEFAULT, 'Guilherme', 'guilhermeM@sptech.school', 'Senha_133', 1, null),
(DEFAULT, 'Juan', 'juanviera@sptech.school', 'Urubu100@', 2, 1);

select u.nome,u.email,u.senha,u.nivelUsuario,o.orgao from Usuario u
        join Orgao o on
        fkOrgao=idOrgao where idUsuario=2;

-- 1 ADM
-- 2 FUNC
-- 3 ORGAO



-- Inserindo áreas
INSERT INTO Area VALUES
-- Linha A
(DEFAULT, 'A', 1, 1), (DEFAULT, 'A', 2, 1), (DEFAULT, 'A', 3, 1),
(DEFAULT, 'A', 4, 1), (DEFAULT, 'A', 5, 1), (DEFAULT, 'A', 6, 1),
(DEFAULT, 'A', 7, 1), (DEFAULT, 'A', 8, 1), (DEFAULT, 'A', 9, 1),

-- Linha B
(DEFAULT, 'B', 1, 1), (DEFAULT, 'B', 2, 1), (DEFAULT, 'B', 3, 1),
(DEFAULT, 'B', 4, 1), (DEFAULT, 'B', 5, 1), (DEFAULT, 'B', 6, 1),
(DEFAULT, 'B', 7, 1), (DEFAULT, 'B', 8, 1), (DEFAULT, 'B', 9, 1),

-- Linha C
(DEFAULT, 'C', 1, 1), (DEFAULT, 'C', 2, 1), (DEFAULT, 'C', 3, 1),
(DEFAULT, 'C', 4, 1), (DEFAULT, 'C', 5, 1), (DEFAULT, 'C', 6, 1),
(DEFAULT, 'C', 7, 1), (DEFAULT, 'C', 8, 1), (DEFAULT, 'C', 9, 1),

-- Linha D
(DEFAULT, 'D', 1, 1), (DEFAULT, 'D', 2, 1), (DEFAULT, 'D', 3, 1),
(DEFAULT, 'D', 4, 1), (DEFAULT, 'D', 5, 1), (DEFAULT, 'D', 6, 1),
(DEFAULT, 'D', 7, 1), (DEFAULT, 'D', 8, 1), (DEFAULT, 'D', 9, 1),

-- Linha E
(DEFAULT, 'E', 1, 1), (DEFAULT, 'E', 2, 1), (DEFAULT, 'E', 3, 1),
(DEFAULT, 'E', 4, 1), (DEFAULT, 'E', 5, 1), (DEFAULT, 'E', 6, 1),
(DEFAULT, 'E', 7, 1), (DEFAULT, 'E', 8, 1), (DEFAULT, 'E', 9, 1),

-- Linha F
(DEFAULT, 'F', 1, 1), (DEFAULT, 'F', 2, 1), (DEFAULT, 'F', 3, 1),
(DEFAULT, 'F', 4, 1), (DEFAULT, 'F', 5, 1), (DEFAULT, 'F', 6, 1),
(DEFAULT, 'F', 7, 1), (DEFAULT, 'F', 8, 1), (DEFAULT, 'F', 9, 1),

-- Linha G
(DEFAULT, 'G', 1, 1), (DEFAULT, 'G', 2, 1), (DEFAULT, 'G', 3, 1),
(DEFAULT, 'G', 4, 1), (DEFAULT, 'G', 5, 1), (DEFAULT, 'G', 6, 1),
(DEFAULT, 'G', 7, 1), (DEFAULT, 'G', 8, 1), (DEFAULT, 'G', 9, 1),

-- Linha H
(DEFAULT, 'H', 1, 1), (DEFAULT, 'H', 2, 1), (DEFAULT, 'H', 3, 1),
(DEFAULT, 'H', 4, 1), (DEFAULT, 'H', 5, 1), (DEFAULT, 'H', 6, 1),
(DEFAULT, 'H', 7, 1), (DEFAULT, 'H', 8, 1), (DEFAULT, 'H', 9, 1),

-- Linha I
(DEFAULT, 'I', 1, 1), (DEFAULT, 'I', 2, 1), (DEFAULT, 'I', 3, 1),
(DEFAULT, 'I', 4, 1), (DEFAULT, 'I', 5, 1), (DEFAULT, 'I', 6, 1),
(DEFAULT, 'I', 7, 1), (DEFAULT, 'I', 8, 1), (DEFAULT, 'I', 9, 1);


SELECT * FROM Area;

-- Inserindo sensores

INSERT INTO Sensor VALUES
-- Linha A
(DEFAULT, 'A1-1', 'Ativo', 1),
(DEFAULT, 'A2-1', 'Ativo', 2),
(DEFAULT, 'A3-1', 'Ativo', 3),
(DEFAULT, 'A4-1', 'Ativo', 4),
(DEFAULT, 'A5-1', 'Ativo', 5),
(DEFAULT, 'A6-1', 'Ativo', 6),
(DEFAULT, 'A7-1', 'Ativo', 7),
(DEFAULT, 'A8-1', 'Ativo', 8),
(DEFAULT, 'A9-1', 'Ativo', 9),

-- Linha B
(DEFAULT, 'B1-1', 'Ativo', 10),
(DEFAULT, 'B9-1', 'Ativo', 18),

-- Linha C
(DEFAULT, 'C1-1', 'Ativo', 19),
(DEFAULT, 'C9-1', 'Ativo', 27),

-- Linha D
(DEFAULT, 'D1-1', 'Ativo', 28),
(DEFAULT, 'D9-1', 'Ativo', 36),

-- Linha E
(DEFAULT, 'E1-1', 'Ativo', 37),
(DEFAULT, 'E9-1', 'Ativo', 45),

-- Linha F
(DEFAULT, 'F1-1', 'Ativo', 46),
(DEFAULT, 'F9-1', 'Ativo', 54),

-- Linha G
(DEFAULT, 'G1-1', 'Ativo', 55),
(DEFAULT, 'G9-1', 'Ativo', 63),

-- Linha H
(DEFAULT, 'H1-1', 'Ativo', 64),
(DEFAULT, 'H9-1', 'Ativo', 72),

-- Linha I
(DEFAULT, 'I1-1', 'Ativo', 73),
(DEFAULT, 'I2-1', 'Ativo', 74),
(DEFAULT, 'I3-1', 'Inativo', 75),
(DEFAULT, 'I4-1', 'Ativo', 76),
(DEFAULT, 'I5-1', 'Ativo', 77),
(DEFAULT, 'I6-1', 'Ativo', 78),
(DEFAULT, 'I7-1', 'Ativo', 79),
(DEFAULT, 'I8-1', 'Ativo', 80),
(DEFAULT, 'I9-1', 'Ativo', 81);


Select * from Sensor;


SELECT idSensor FROM Sensor;

-- Inserindo dados
INSERT INTO dados VALUES 
(DEFAULT, 25.5, 75, DEFAULT, 1, 1),
(DEFAULT, 28.7, 70, DEFAULT, 2, 2);

SELECT * from Dados;
SELECT * FROM Dados WHERE fkSensor = 32;

-- Visualizar todos os órgãos
SELECT * FROM orgao;

-- Visualizar todos os usuários
SELECT * FROM usuario;

-- Visualizar grid das áreas
SELECT idArea, CONCAT(grid, numero) AS Grid FROM Area;

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
JOIN area ON sensor.fkArea = Area.idArea 
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

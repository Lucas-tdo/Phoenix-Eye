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
    fkSensor INT,
    Situacao_dado VARCHAR(15),
    CONSTRAINT Fk_Sensor_Dados FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
    CONSTRAINT Check_Situacao CHECK (Situacao_dado IN ("Normal", "Alerta" , "Perigo", "Incêndio"))
);


CREATE TABLE Acesso(
	idAcesso INT AUTO_INCREMENT,
	fkUsuario INT,
    fkMonitoramento INT,
    fkOrgao INT,
    dataAcesso DATETIME DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT Chave_composta_Acesso PRIMARY KEY (idAcesso,fkUsuario, fkMonitoramento, fkOrgao, dataAcesso),
    CONSTRAINT fk_usuario_acesso FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
	CONSTRAINT fk_Monitoramento_acesso FOREIGN KEY (fkMonitoramento) REFERENCES Monitoramento(idMonitoramento),
	CONSTRAINT fk_Orgao_acesso FOREIGN KEY(fkOrgao) REFERENCES Orgao(idOrgao)
);

SELECT * FROM Acesso;

INSERT INTO Acesso VALUES 
(DEFAULT, 1, 2, 1 , DEFAULT);


-- Inserindo um orgão
INSERT INTO Orgao VALUES 
(DEFAULT, 'Corpo de Bombeiros', '12345678000199', '11999998888', 'Corpodebombeiro@gov.br', 'Urubu100@');

-- Inserindo usuários
INSERT INTO Usuario VALUES 
(DEFAULT, 'Guilherme', 'guilhermeM@sptech.school', 'Senha_133', 1, null),
(DEFAULT, 'Juan', 'juanviera@sptech.school', 'Urubu100@', 2, 1);

DELETE FROM Usuario WHERE idUsuario = 4;
SELECT * FROM Usuario;

SELECT * FROM Acesso;

SELECT * FROM Monitoramento;

INSERT INTO Monitoramento VALUES
(DEFAULT , 'Area Verde 3' , '','Aprovado' , 1);

SHOW TABLES;


UPDATE Monitoramento SET Status_Monitoramento = "Aprovado" WHERE idMonitoramento = 2;

SELECT * FROM Monitoramento;

SELECT * FROM Area;

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
(DEFAULT, 'I3-1', 'Ativo', 75),
(DEFAULT, 'I4-1', 'Ativo', 76),
(DEFAULT, 'I5-1', 'Ativo', 77),
(DEFAULT, 'I6-1', 'Ativo', 78),
(DEFAULT, 'I7-1', 'Ativo', 79),
(DEFAULT, 'I8-1', 'Ativo', 80),
(DEFAULT, 'I9-1', 'Ativo', 81);




-- Visualizar funcionários e seu órgão associado
SELECT 
    usuario.nome AS Nome_Funcionario, 
    orgao.orgao AS Orgao_Vinculado 
FROM usuario 
JOIN orgao ON usuario.fkOrgao = orgao.idOrgao;
select * from Dados where fkSensor =26;
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
    Sensor.idSensor AS ID,
    Sensor.nome AS Nome_Sensor,
    Sensor.status_sensor,
    Dados.temperatura,
    Dados.umidade,
    Dados.dtMedicao
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
WHERE Monitoramento.idMonitoramento = 1;

-- Puxar dados do Sensor
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
    FROM Dados AS d1
    JOIN (
        SELECT fkSensor, MAX(dtMedicao) AS maxData
        FROM Dados
        GROUP BY fkSensor
    ) AS d2 
    ON d1.fkSensor = d2.fkSensor AND d1.dtMedicao = d2.maxData
) AS Dados 
ON Dados.fkSensor = Sensor.idSensor
JOIN Area 
ON Sensor.fkArea = Area.idArea
JOIN Monitoramento 
ON Monitoramento.idMonitoramento = Area.FkMonitoramento
WHERE Sensor.status_sensor = 'Ativo'
  AND Monitoramento.idMonitoramento = 1;

SELECT * FROM Sensor;
SELECT * FROM Dados;
  
SELECT Sensor.Nome, MAX(Dados.dtMedicao) FROM Sensor JOIN Dados ON Sensor.idSensor = Dados.fkSensor GROUP BY Sensor.Nome;
  
SELECT Sensor.Nome, Dados.temperatura, Dados.Situacao_dado 
FROM Sensor JOIN Dados ON Dados.fkSensor = Sensor.idSensor 
GROUP BY Sensor.Nome, Dados.temperatura, Dados.Situacao_dado;
  
  
  
SELECT 
    s.idSensor AS ID,
    s.nome AS Nome_Sensor,
    s.status_sensor,
    d.temperatura,
    d.umidade,
    d.dtMedicao,
    d.Situacao_dado AS Situacao
FROM Sensor s
JOIN Dados d ON s.idSensor = d.fkSensor
JOIN (
    SELECT fkSensor, MAX(dtMedicao) AS max_dt
    FROM Dados
    GROUP BY fkSensor
) latest ON latest.fkSensor = d.fkSensor AND latest.max_dt = d.dtMedicao
JOIN Area a ON s.fkArea = a.idArea
JOIN Monitoramento m ON m.idMonitoramento = a.FkMonitoramento
WHERE s.status_sensor = 'Ativo'
  AND m.idMonitoramento = 1;

update Sensor SET status_sensor = "Manutencao" WHERE idSensor = 15;
  
TRUNCATE TABLE Dados;


TRUNCATE TABLE Monitoramento;


SELECT * FROM Monitoramento WHERE idMonitoramento = 1;

SELECT * FROM Monitoramento;

SELECT Nome_Atribuido, Imagem, Status_Monitoramento,FkOrgao,idMonitoramento, Orgao.orgao
FROM Monitoramento JOIN Orgao ON Orgao.idOrgao = Monitoramento.FkOrgao 
WHERE Status_Monitoramento = "Em análise" AND FkOrgao = 1;


SELECT Sensor.nome ,Dados.temperatura, Dados.umidade ,Dados.dtMedicao ,Dados.Situacao_dado
FROM Sensor JOIN Dados ON Dados.fkSensor = Sensor.idSensor WHERE Dados.Situacao_dado = "Incêndio";


SELECT Monitoramento.Nome_Atribuido,
  (SELECT COUNT(*) FROM Dados WHERE Situacao_dado = 'Alerta' AND DATE(dtMedicao) = CURDATE()) AS total_alertas,
  (SELECT COUNT(*) FROM Dados WHERE Situacao_dado = 'Perigo' AND DATE(dtMedicao) = CURDATE()) AS total_perigos,
  (SELECT COUNT(*) FROM Dados WHERE Situacao_dado = 'Incêndio' AND DATE(dtMedicao) = CURDATE()) AS total_incendios;
;


  SELECT Orgao.orgao,Monitoramento.* FROM Monitoramento JOIN Orgao ON Orgao.idOrgao = Monitoramento.FKOrgao WHERE FkOrgao = 1 AND Status_Monitoramento = "Aprovado";


-- Dados de alerta, perigo e incêndio nos ultimos 5 dias 
SELECT 
    DATE(dtMedicao) AS dia,
    SUM(CASE WHEN Situacao_dado = 'Alerta' THEN 1 ELSE 0 END) AS alertas,
    SUM(CASE WHEN Situacao_dado = 'Perigo' THEN 1 ELSE 0 END) AS perigos,
    SUM(CASE WHEN Situacao_dado = 'Incêndio' THEN 1 ELSE 0 END) AS incendios
FROM Dados JOIN Sensor ON Sensor.idSensor = Dados.fkSensor 
JOIN Area ON Sensor.fkArea = Area.idArea JOIN Monitoramento ON Monitoramento.idMonitoramento= 
Area.fkMonitoramento
WHERE dtMedicao >= CURDATE() - INTERVAL 4 DAY AND Monitoramento.idMonitoramento = 1
GROUP BY DATE(dtMedicao)
ORDER BY dia DESC;


SELECT * FROM Usuario;

DELETE FROM Acesso WHERE fkUsuario = 3;

SELECT Usuario.nome, Monitoramento.Nome_Atribuido ,Acesso.dataAcesso 
FROM Acesso JOIN Monitoramento ON fkMonitoramento = Monitoramento.idMonitoramento
JOIN Usuario ON fkUsuario = Usuario.idUsuario 
JOIN Orgao  ON Usuario.fkOrgao = Orgao.idOrgao 
WHERE Usuario.fkOrgao = 1; 


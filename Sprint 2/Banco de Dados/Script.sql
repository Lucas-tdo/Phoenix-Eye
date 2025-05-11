use sprint2;

create table orgao(
idOrgao int primary key auto_increment,
orgao varchar(45),
cnpj char(15),
telefone char(11),
email varchar(45),
senha varchar(20)
);

create table usuario(
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(20),
nivelUsuario int,
fkOrgao int,
constraint fkOrganizacao foreign key (fkOrgao) references orgao (idOrgao)
);

create table area(
idArea int primary key auto_increment,
grid char(1),
numero int
);

create table monitoramento (
fkOrgao INT,
fkArea INT,
responsavel VARCHAR(45),
CONSTRAINT pkOrgaoArea PRIMARY KEY (fkOrgao, fkArea),
CONSTRAINT fkOrgaoArea 
FOREIGN KEY (fkOrgao) REFERENCES orgao (idOrgao),
FOREIGN KEY (fkArea) REFERENCES area (idArea)
);

CREATE TABLE sensor (
idSensor int primary key AUTO_INCREMENT,
nome VARCHAR(30),
status_sensor VARCHAR(20),
fkArea INT,
CONSTRAINT fkArea FOREIGN KEY (fkArea) REFERENCES Area(idArea)
);

CREATE TABLE dados (
idDados INT AUTO_INCREMENT,
temperatura DECIMAL(4,2),
umidade INT,
dtMedicao DATETIME,
nivelRisco INT,
fkSensor  INT,
CONSTRAINT fkSensorDados FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
primary key (idDados,fkSensor)
);

insert into orgao values 
(default,'Corpo de Bombeiros', '12345678000199', '11999998888', 'Corpodebombeiro@gov.br', 'Urubu100@');

insert into usuario values 
(default,'Guilherme', 'Marques', 'guilhermeM@sptech.school', 'senha_133', '12345678901',default, 1),
(default,'Juan', 'Viera', 'juanviera@@sptech.school', 'Urubu100@','10987654321',default, 1);

insert into Area values
(default,'A', 1, 1),
(default,'A', 2, 1),
(default,'A', 3, 1),
(default,'A', 4, 1),
(default,'A',5,1);

insert into sensor values
(default,'DHT11', 'Ativo', '2025-01-10 10:00:00', '2025-01-20 09:00:00', 'Manutenção geral', 1),
(default,'DHT11', 'Inativo', null, null, 'Manutenção geral', 2);

insert into dados values 
(default,25.5, 75, default, 1, 1),
(default,28.7, 70, default, 1, 2);


select * from orgao;

select * from usuario;

select idArea, concat(Grid,numero) as Grid, fkOrgao from area;

select * from sensor;

select * from dados;

-- Visualizar funcionários e seu orgão associado
select nome as Nome_Funcionário, orgao as Orgão_Vínculado from orgao 
join usuario on FKOrgao = idOrgao;

-- Mostrar sensores da área que estão ativos e seu grid respectivo
select 
	idSensor,
	nomeSensor as nome_sensor,
	Status_Sensor,
	concat(Grid,numero) as Grid
from sensor join area on fkArea = idArea where Status_sensor = "Ativo";

-- Visualizar dados (temperatura e umidade) respectivos do sensor
select 
	idSensor as ID,
    nomeSensor as Nome_Sensor,
    Status_Sensor,
    temperatura,
    umidade
from sensor join dados on fkSensor = idSensor
where Status_Sensor = "Ativo";
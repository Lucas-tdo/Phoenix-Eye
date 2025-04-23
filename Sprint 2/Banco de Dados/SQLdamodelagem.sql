use sprint2;

create table orgao(
idOrgao int primary key auto_increment,
orgao varchar(45),
CNPJ char(15),
telefone char(11),
email varchar(45),
senha varchar(45)
);

create table usuario(
idUser int auto_increment,
Nome varchar(50),
sobrenome varchar(50),
email varchar(50),
senha varchar(45),
Cpf char(11),
dtCadastro datetime default current_timestamp,
FKOrgao int,
constraint fkOrganizacao foreign key (fkOrgao) references orgao(idOrgao),
primary key (idUser,FKOrgao)
);

create table Area(
idArea int primary key auto_increment,
Grid char(1),
numero int,
fkOrgao int,
constraint fkOrgao foreign key (fkOrgao) references orgao(idOrgao)
);

CREATE TABLE sensor (
idSensor int primary key AUTO_INCREMENT,
nomeSensor VARCHAR(30),
Status_Sensor VARCHAR(20),
dtInstalacao DATETIME,
dtManutencao DATETIME,
descManutencao VARCHAR(500),
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
CONSTRAINT fkSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
primary key (idDados,fkSensor)
);




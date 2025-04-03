create database Tabelas_definitivas;

use Tabelas_definitivas;

create table usuário(
idUser int primary key auto_increment,
Nome varchar(50),
Sobrenome varchar (100),
email varchar(100) unique,
senha varchar(100) unique,
Orgão varchar(100),
Cpf char(11) unique,
Nivel_de_acesso int,
constraint chkNivel check (nivel_de_acesso in(0, 1, 2)),
dtCadastro datetime default current_timestamp
);
insert into usuário values 
(default, 'Andre', 'Ferreira', 'andre.lacerda@sptech.school', 'xxxxxxxxxx', 'Defesa Civil', 11111111111, 1, default),
(default, 'Alexandre', 'Soares', 'alexandre.soares@sptech.school', 'bbbbbbbbbbb', 'Prefeitura de São Paulo', 21111111111, 0, default),
(default, 'Guilherme', 'Toledo', 'guilherme.toledo@sptech.school', 'cccccccccccccc', 'Corpo de Bombeiros', 21111111131, 2, default),
(default, 'Homero', 'Brescancin', 'homero.brescancin@sptech.school', 'ddddddddddd', 'Secretaria do Meio Ambiente', 21111114131, 2, default),
(default, 'Guilherme', 'Gomes', 'guilherme.gomes@sptech.school', 'eeeeeeeeeeeee', 'Defesa Civil', 11111511111, 1, default),
(default, 'Lucal', 'Calil', 'lucas.calil@sptech.school', 'fffffffffff', 'Prefeitura de São Paulo', 21181111111, 0, default),
(default, 'João', 'Torelli', 'joao.torelli@sptech.school', 'gggggggggggggg', 'Corpo de Bombeiros', 21511111131, 2, default),
(default, 'Gabriel', 'Figueiredo', 'gabriel.figueiredo@sptech.school', 'yyyyyyyyyyyyyy', 'Secretaria do Meio Ambiente', 21111714131, 2, default);

select * from usuário where orgão like "P%";
select nome from usuário;
select concat(nome, ' do órgão ', orgão, ' possui nivel de acesso ', Nivel_de_acesso) as 'Nome e nível de acesso' from usuário;



create table sensor(
idSensor int primary key auto_increment,
nomeSensor varchar(30),
gridLocal varchar(30),
Stats varchar(50),
constraint chkstats 
	check (stats in('Ativo','Inativo','Pendente manutenção')),
dtInstalacao date,
numSerial char(15) unique,
dtManutencao date,
descManutencao varchar(500)
);
insert into sensor values
(default, 'DHT11', 'A1', 'Ativo', '2025-01-02', 'abcdefghijkl', '2025-05-23', 'Substituição da bateria do sensor'),
(default, 'DHT11', 'A2', 'Inativo', '2025-01-11', 'abcdefhijkl', '2025-07-10', 'Recalibração do sensor de temperatura'),
(default, 'DHT11', 'A3', 'Ativo', '2025-02-22', 'bcdefghijkl', '2025-12-01', 'Verificação do módulo de conexão'),
(default, 'DHT11', 'A4', 'Pendente manutenção', '2025-08-11', 'abcdefsvkdijk', '2025-09-30', 'Troca do sensor por defeito técnico');

select descManutencao from sensor;
select * from sensor;
select * from sensor where stats like "%V_";


create table dados(
idDados int primary key auto_increment,
nomeSensor varchar(30),
temperatura float,
umidade float,
dtMedicao datetime 
);
insert into dados values
(default, 'DHT11', 32.4, 78.4, default),
(default, 'DHT11', 53.5, 54, default),
(default, 'DHT11', 18.9, 90.7, default),
(default, 'DHT11', 25.2, 60.1, default);

select concat('O sensor ', nomeSensor, ' aferiu ', temperatura, '°C de temperatura e ', umidade, '% de umidade relativa do ar') as 'Sensor e medição' from dados; 
select * from dados where temperatura <= 26;
select * from dados where umidade > 75;

drop table historicoRisco;
create table historicoRisco(
	idOcorrencia int primary key auto_increment,
    gridLocalizacao varchar(4),
	temperatura decimal(4,2),
    umidade decimal(4,2),
    nivelRisco varchar(20)
    );
    
alter table historicoRisco add constraint chkRisco check (nivelRisco in('critico','incendio'));

insert into historicoRisco values
(default, 'A1', 62, 40, 'incendio'),
(default, 'A2', 48, 62.5, 'critico'),
(default, 'A3', 55, 36.21, 'incendio');

select * from historicoRisco;
select gridLocalizacao, temperatura, umidade from historicoRisco;
select * from historicoRisco where nivelRisco like "C%";

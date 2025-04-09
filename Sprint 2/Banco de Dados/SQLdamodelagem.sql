use sprint2;
create table orgao(
idOrgao int primary key auto_increment,
CNPJ char(15),
email varchar(50),
telefone char(11)
);

create table usuario(
idUser int primary key auto_increment,
Nome varchar(50),
sobrenome varchar(50),
email varchar(50),
Cpf char(11),
Nivel int,
dtCadastro datetime default current_timestamp,
fkOrganizacao int,
constraint fkOrganizacao foreign key (fkOrganizacao) references orgao(idOrgao)
);

create table Area(
idArea int primary key auto_increment,
Grid char(1),
local int,
fkOrgao int,
constraint fkOrgao foreign key (fkOrgao) references orgao(idOrgao)
);


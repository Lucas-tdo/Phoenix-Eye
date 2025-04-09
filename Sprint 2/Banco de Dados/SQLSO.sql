use sqlso;
show tables;

select * from selecao;

insert into selecao values
(default,'Uruguai','URU'),
(default,'Espanha','ESP');

create table dados(
idDado int primary key auto_increment,
temperatura float, 
umidade float, 
dataAquisicao datetime default current_timestamp
);

drop table dados;
select * from dados order by idDado desc ; 

insert into dados value (
1, 1, 2, default
);
DROP DATABASE IF EXISTS "users-db";
CREATE DATABASE "users-db";
CREATE TYPE opcoesEtinia AS ENUM('NEGRO','PARDO','BRANCO');

CREATE TABLE usuarios (
	usuarioId SERIAL PRIMARY KEY,
	nome varchar(150) NOT NULL,
	telefone int,
	email varchar(150) NOT NULL,
	idade int NOT NULL,
	peso int,
	etinia opcoesEtinia
);

CREATE TABLE enderecos (
	usuarioId int NOT NULL,
	endId SERIAL PRIMARY KEY,
	endereco varchar(150) NOT NULL,
	numero int,
	complemento varchar(50),
	cep int,
	cidade varchar(50),
	estado varchar(5),
	FOREIGN KEY (usuarioId) REFERENCES usuarios (usuarioId)
);

INSERT INTO usuarios (nome, telefone, email, idade, peso, etinia)
		VALUES('adriano', '999999999', 'a@a.com', 26, 80, 'NEGRO'),
					('ronaldo', '988888888', 'b@b.com', 43, 73, 'BRANCO');

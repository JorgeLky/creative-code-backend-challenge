DROP DATABASE IF EXISTS "users-db";
CREATE DATABASE "users-db";
CREATE TYPE opcoesEtinia AS ENUM('NEGRO','PARDO','BRANCO');

CREATE TABLE usuarios (
	usuarioId SERIAL PRIMARY KEY,
	nome varchar(150) NOT NULL,
	telefone int NOT NULL,
	email varchar(150) NOT NULL,
	idade int NOT NULL,
	peso int NOT NULL,
	etinia opcoesEtinia NOT NULL
);

CREATE TABLE enderecos (
	usuarioId int,
	endId SERIAL PRIMARY KEY,
	endereco varchar(150) NOT NULL,
	numero int NOT NULL,
	complemento varchar(50),
	cep int NOT NULL,
	cidade varchar(50) NOT NULL,
	estado varchar(5) NOT NULL,
	FOREIGN KEY (usuarioId) REFERENCES usuarios (usuarioId)
);

INSERT INTO usuarios (nome, telefone, email, idade, peso, etinia)
		VALUES('adriano', '999999999', 'a@a.com', 26, 80, 'NEGRO'),
					('ronaldo', '988888888', 'b@b.com', 43, 73, 'BRANCO');

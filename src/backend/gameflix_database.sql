CREATE DATABASE gameflix
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_general_ci;

USE gameflix;


CREATE TABLE lista_de_jogos(
    id_usuario INT NOT NULL,
    id_jogo INT NOT NULL
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT NOT NULL,
    id_usuario INT NOT NULL,
    nome VARCHAR(12) NOT NULL,
    avatar VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE cadastro (
    id_conta INT AUTO_INCREMENT NOT NULL,
    nome_login VARCHAR(12) NOT NULL,
    senha VARCHAR(18) NOT NULL,
    email VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_conta)
);
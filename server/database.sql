CREATE DATABASE QrMenu;

CREATE TABLE restaurante(
cod_Restaurante SERIAL PRIMARY KEY,
nome_Restaurante VARCHAR(50) NOT NULL,
cidade_Restaurante VARCHAR(50) NOT NULL,
estado_Restaurante VARCHAR(50) NOT NULL
);

CREATE TABLE gerente(
cod_Gerente SERIAL PRIMARY KEY,
nome_Gerente VARCHAR(50) NOT NULL,
sobrenome_Gerente VARCHAR(50) NOT NULL
);

CREATE TABLE cardapio(
cod_Cardapio SERIAL PRIMARY KEY,
data_update_cardapio DATE
);

CREATE TABLE produto(
cod_Produto SERIAL PRIMARY KEY,
nome_Produto VARCHAR(90) NOT NULL,
preco_Produto MONEY NOT NULL
);

CREATE TABLE imagem_Produto(
cod_Imagem SERIAL PRIMARY KEY,
nome_Imagem VARCHAR(50) NOT NULL,
qr_Imagem bytea NOT NULL
);

ALTER TABLE restaurante ADD cod_Gerente SERIAL REFERENCES gerente(cod_Gerente);

ALTER TABLE gerente ADD cod_Cardapio SERIAL REFERENCES cardapio(cod_Cardapio);

ALTER TABLE produto ADD cod_Cardapio SERIAL REFERENCES cardapio(cod_Cardapio);

ALTER TABLE imagem_Produto ADD cod_Produto SERIAL REFERENCES produto(cod_Produto);
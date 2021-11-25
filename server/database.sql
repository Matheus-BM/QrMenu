CREATE TABLE gerente(
cod_gerente SERIAL PRIMARY KEY,
nome_gerente VARCHAR(50) NOT NULL,
sobrenome_gerente VARCHAR(50) NOT NULL,
senha_gerente INT NOT NULL,
email_gerente INT NOT NULL
);

CREATE TABLE restaurante(
cod_restaurante SERIAL PRIMARY KEY,
nome_restaurante VARCHAR(50) NOT NULL,
cod_gerente SERIAL REFERENCES gerente(cod_gerente),
cod_cardapio SERIAL REFERENCES cardapio(cod_cardapio)
);

CREATE TABLE produto(
cod_produto SERIAL PRIMARY KEY,
nome_produto VARCHAR(50) NOT NULL,
descricao_produto VARCHAR(100) NOT NULL,
preco_produto INT NOT NULL,
cod_categoria SERIAL REFERENCES categoria(cod_categoria),
cod_cardapio SERIAL REFERENCES cardapio(cod_cardapio)
);

CREATE TABLE cardapio(
cod_cardapio SERIAL PRIMARY KEY
);

CREATE TABLE categoria(
cod_categoria SERIAL PRIMARY KEY,
nome_categoria VARCHAR(40) NOT NULL
);
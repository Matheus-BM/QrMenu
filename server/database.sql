CREATE TABLE gerente(
cod_gerente SERIAL PRIMARY KEY,
nome_gerente VARCHAR(50) NOT NULL,
sobrenome_gerente VARCHAR(50) NOT NULL,
senha_gerente VARCHAR(100) NOT NULL,
email_gerente VARCHAR(100) NOT NULL
);

CREATE TABLE cardapio(
cod_cardapio SERIAL PRIMARY KEY
);

CREATE TABLE categoria(
cod_categoria SERIAL PRIMARY KEY,
nome_categoria VARCHAR(40) NOT NULL,
prioridade_categoria INT NOT NULL,
cod_cardapio SERIAL REFERENCES cardapio(cod_cardapio) ON DELETE CASCADE 
ON UPDATE CASCADE
);

CREATE TABLE restaurante(
cod_restaurante SERIAL PRIMARY KEY,
nome_restaurante VARCHAR(50) NOT NULL,
cod_gerente SERIAL REFERENCES gerente(cod_gerente)ON DELETE CASCADE
ON UPDATE CASCADE,
cod_cardapio SERIAL REFERENCES cardapio(cod_cardapio) ON DELETE CASCADE
ON UPDATE CASCADE
);

CREATE TABLE produto(
cod_produto SERIAL PRIMARY KEY,
nome_produto VARCHAR(50) NOT NULL,
descricao_produto VARCHAR(100) NOT NULL,
preco_produto MONEY NOT NULL,
cod_categoria SERIAL REFERENCES categoria(cod_categoria) ON DELETE CASCADE
ON UPDATE CASCADE
);
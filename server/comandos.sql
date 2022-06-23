CREATE DATABASE jogueiros;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar table de usuários
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    celular VARCHAR(15) NOT NULL
);

-- Criar table de anúncios
CREATE TABLE anuncios(
    id SERIAL,
	id_anunciante UUID NOT NULL,
    titulo VARCHAR(80) NOT NULL,
	descricao VARCHAR(255),
    preco VARCHAR(5) NOT NULL,
	imagem VARCHAR(255),
	cep VARCHAR(9) NOT NULL,
	logradouro VARCHAR(255) NOT NULL,
	numero VARCHAR(5),
	complemento VARCHAR(50),
	bairro VARCHAR(50) NOT NULL,
	cidade VARCHAR(30) NOT NULL,
	estado VARCHAR(20) NOT NULL,
	visualizacao NUMERIC DEFAULT 0 NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_anunciante) REFERENCES users(user_id)
);

-- Função de data de criação/atualização de tabela
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar table de agendamentos
CREATE TABLE agendamentos(
    id SERIAL,
    id_anuncio INTEGER NOT NULL,
	id_usuario UUID NOT NULL,
	nome_usuario VARCHAR(255) NOT NULL,
	celular VARCHAR(15) NOT NULL,
	titulo VARCHAR(80) NOT NULL,
	preco VARCHAR(6) NOT NULL,
	imagem VARCHAR(255),
    data_agendamento VARCHAR(10) NOT NULL,
	hora_inicio VARCHAR(5) NOT NULL,
	hora_final VARCHAR(5) NOT NULL,
	status VARCHAR(10) NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (id_anuncio) REFERENCES anuncios(id) ON DELETE CASCADE,
	FOREIGN KEY (id_usuario) REFERENCES users(user_id)
);

SELECT * FROM users;
SELECT * FROM anuncios;
SELECT * FROM agendamentos;

DROP TABLE agendamentos;
DROP TABLE anuncios;
DROP TABLE users;



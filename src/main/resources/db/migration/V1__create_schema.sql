-- tb_usuario: tabela pai da herança JOINED (Usuario)
CREATE TABLE tb_usuario (
                            id        BIGSERIAL PRIMARY KEY,
                            nome      VARCHAR(255) NOT NULL,
                            email     VARCHAR(255) NOT NULL UNIQUE,
                            senha     VARCHAR(255) NOT NULL,
                            telefone  VARCHAR(255) NOT NULL,
                            role      VARCHAR(20)  NOT NULL
);

-- tb_admin: filha de tb_usuario (sem colunas próprias)
CREATE TABLE tb_admin (
                          id BIGINT PRIMARY KEY REFERENCES tb_usuario(id)
);

-- tb_funcionarios: filha de tb_usuario
CREATE TABLE tb_funcionarios (
                                 id    BIGINT PRIMARY KEY REFERENCES tb_usuario(id),
                                 cargo VARCHAR(20) NOT NULL
);

CREATE TABLE tb_clientes (
                             id       BIGSERIAL PRIMARY KEY,
                             nome     VARCHAR(255) NOT NULL,
                             email    VARCHAR(255) UNIQUE,
                             telefone VARCHAR(255),
                             endereco VARCHAR(255)
);

CREATE TABLE tb_pets (
                         id               BIGSERIAL PRIMARY KEY,
                         nome             VARCHAR(80) NOT NULL,
                         especie          VARCHAR(60) NOT NULL,
                         raca             VARCHAR(60),
                         data_nascimento  DATE,
                         id_cliente       BIGINT NOT NULL REFERENCES tb_clientes(id)
);

CREATE TABLE tb_agendamentos (
                                 id              BIGSERIAL PRIMARY KEY,
                                 id_pet          BIGINT NOT NULL REFERENCES tb_pets(id),
                                 id_veterinario  BIGINT NOT NULL REFERENCES tb_funcionarios(id),
                                 data            DATE NOT NULL,
                                 hora            TIME NOT NULL,
                                 motivo          VARCHAR(200) NOT NULL,
                                 status          VARCHAR(20) NOT NULL
);

CREATE TABLE tb_prontuarios (
                                id              BIGSERIAL PRIMARY KEY,
                                id_pet          BIGINT NOT NULL REFERENCES tb_pets(id),
                                id_veterinario  BIGINT NOT NULL REFERENCES tb_funcionarios(id),
                                data_registro   TIMESTAMP NOT NULL,
                                descricao       TEXT NOT NULL,
                                prescricao      TEXT
);

CREATE TABLE tb_vacinas (
                            id                        BIGSERIAL PRIMARY KEY,
                            pet_id                    BIGINT NOT NULL REFERENCES tb_pets(id),
                            nome                      VARCHAR(100) NOT NULL,
                            data_aplicacao            DATE NOT NULL,
                            proxima_dose              DATE,
                            lote                      VARCHAR(60),
                            veterinario_responsavel   VARCHAR(120)
);

CREATE TABLE tb_produtos (
                             id                   BIGSERIAL PRIMARY KEY,
                             nome                 VARCHAR(120) NOT NULL,
                             descricao            VARCHAR(500),
                             preco                NUMERIC(10,2) NOT NULL,
                             quantidade_estoque   INTEGER NOT NULL
);

CREATE TABLE tb_pagamentos (
                               id              BIGSERIAL PRIMARY KEY,
                               agendamento_id  BIGINT NOT NULL REFERENCES tb_agendamentos(id),
                               valor           NUMERIC(10,2) NOT NULL,
                               forma_pagamento VARCHAR(20) NOT NULL,
                               status          VARCHAR(20) NOT NULL,
                               data_pagamento  TIMESTAMP NOT NULL
);

CREATE TABLE tb_vendas (
                           id           BIGSERIAL PRIMARY KEY,
                           cliente_id   BIGINT NOT NULL REFERENCES tb_clientes(id),
                           produto_id   BIGINT NOT NULL REFERENCES tb_produtos(id),
                           quantidade   INTEGER NOT NULL,
                           valor_total  NUMERIC(10,2) NOT NULL,
                           data         DATE NOT NULL
);
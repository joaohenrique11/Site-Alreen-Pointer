CREATE DATABASE IF NOT EXISTS alreen_pointer
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE alreen_pointer;

CREATE TABLE IF NOT EXISTS agendamentos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome_cliente VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  telefone VARCHAR(24) NOT NULL,
  data DATE NOT NULL,
  horario TIME NOT NULL,
  servico VARCHAR(80) NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_agendamento_data_horario (data, horario),
  INDEX idx_agendamentos_data (data)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Banco de dados do projeto MHI
CREATE DATABASE IF NOT EXISTS mhi_database;

USE mhi_database;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    nivel_usuario ENUM('usuario', 'admin') NOT NULL DEFAULT 'usuario'
);

-- Tabela de sentimentos
CREATE TABLE IF NOT EXISTS sentimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    orientacoes TEXT
);

-- Tabela de transtornos
CREATE TABLE IF NOT EXISTS transtornos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    sintomas TEXT,
    informacoes_adicionais TEXT
);

-- Tabela de localidades
CREATE TABLE IF NOT EXISTS localidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    tipo_servico VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(30),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7)
);

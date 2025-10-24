-- phpMyAdmin SQL Dump
-- Script para crear la tabla de clientes
-- Ejecutar en la base de datos barkios_db

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Índices para la tabla
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`);

-- AUTO_INCREMENT
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- Datos de ejemplo
INSERT INTO `clients` (`id`, `nombre`, `apellido`, `cedula`, `created_at`) VALUES
(1, 'Juan', 'Pérez', '12345678', CURRENT_TIMESTAMP),
(2, 'María', 'González', '87654321', CURRENT_TIMESTAMP);

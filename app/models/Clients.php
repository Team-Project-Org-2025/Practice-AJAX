<?php

// app/models/Clients.php
namespace Ajax\models;
require_once __DIR__ . '/../core/Database.php';

use Ajax\core\Database;
use PDO;
use Exception;

class Clients extends Database {

    public function __construct() {
        // Llama al constructor de la clase padre (Database)
        parent::__construct();
    }

    // Función que asume que existe en la clase Database (necesaria para el controlador)
    public function getLastInsertId(): ?int {
        try {
            return (int)$this->db->lastInsertId();
        } catch (\Throwable $e) {
            return null;
        }
    }

    // =============================================================
    // 🚨 MÉTODOS CRUD PARA GESTIÓN DE CLIENTES 🚨
    // =============================================================

    /**
     * Obtiene todos los clientes registrados.
     */
    public function getAll() {
        try {
            $stmt = $this->db->query("SELECT id, nombre, apellido, cedula FROM clients ORDER BY id ASC");
            return $stmt ? $stmt->fetchAll(PDO::FETCH_ASSOC) : [];
        } catch (\Throwable $e) {
             error_log("Error al obtener todos los clientes: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Verifica si un cliente existe por su ID o Cédula.
     */
    public function clientExists(int $id = null, string $cedula = null): bool {
        if ($id !== null) {
            $stmt = $this->db->prepare("SELECT COUNT(*) FROM clients WHERE id = :id");
            $stmt->execute([':id' => $id]);
        } elseif ($cedula !== null) {
               $stmt = $this->db->prepare("SELECT COUNT(*) FROM clients WHERE cedula = :cedula");
            $stmt->execute([':cedula' => $cedula]);
        } else {
            return false;
        }
        return $stmt->fetchColumn() > 0;
    }

    /**
     * Obtiene un cliente por su ID.
     */
    public function getById(int $id) {
        $stmt = $this->db->prepare("SELECT id, nombre, apellido, cedula FROM clients WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    /**
     * Agrega un nuevo cliente.
     */
    public function add(string $nombre, string $apellido, string $cedula) {
        if ($this->clientExists(null, $cedula)) {
            throw new Exception("Ya existe un cliente con esta cédula.");
        }

        $stmt = $this->db->prepare("
            INSERT INTO clients (nombre, apellido, cedula)
            VALUES (:nombre, :apellido, :cedula)
        ");
        return $stmt->execute([
            ':nombre' => $nombre,
            ':apellido' => $apellido,
            ':cedula' => $cedula
        ]);
    }

    /**
     * Actualiza los datos de un cliente existente.
     */
    public function update(int $id, string $nombre, string $apellido, string $cedula = null) {
        if (!$this->clientExists($id)) {
            throw new Exception("No existe el cliente con ID: $id");
        }

        // Verificar si la nueva cédula ya existe en otro cliente
        if ($cedula && $this->clientExists(null, $cedula)) {
            $existingClient = $this->getByCedula($cedula);
            if ($existingClient['id'] != $id) {
                throw new Exception("Ya existe otro cliente con esta cédula.");
            }
        }

        $sql = "UPDATE clients SET nombre = :nombre, apellido = :apellido WHERE id = :id";
        $params = [
            ':id' => $id,
            ':nombre' => $nombre,
            ':apellido' => $apellido
        ];

        if ($cedula) {
            $sql = "UPDATE clients SET nombre = :nombre, apellido = :apellido, cedula = :cedula WHERE id = :id";
            $params[':cedula'] = $cedula;
        }

        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    /**
     * Obtiene un cliente por su cédula.
     */
    public function getByCedula(string $cedula) {
        $stmt = $this->db->prepare("SELECT id, nombre, apellido, cedula FROM clients WHERE cedula = :cedula");
        $stmt->execute([':cedula' => $cedula]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    /**
     * Elimina un cliente por su ID.
     */
    public function delete(int $id) {
        $stmt = $this->db->prepare("DELETE FROM clients WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
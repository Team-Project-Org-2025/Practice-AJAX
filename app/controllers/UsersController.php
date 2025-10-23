<?php
// filepath: c:\xampp\htdocs\BarkiOS\app\controllers\UserController.php

use Ajax\models\User;

// ✅ Inicializa el modelo
$userModel = new User();

// =================================================================
// 🔹 Acción principal (vista)
// =================================================================
function index() {
    // Esta función solo carga la plantilla de la vista
    require __DIR__ . '/../views/users-admin.php';
}

// =================================================================
// 🧱 Funciones CRUD normales (no AJAX)
// =================================================================
function add() {
    global $userModel;
    
    $fields = ['nombre', 'email', 'password'];
    foreach ($fields as $f) {
        if (empty($_POST[$f])) {
            header("Location: ?url=users&error=missing_field&field=$f");
            exit();
        }
    }

    $nombre = trim($_POST['nombre']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if ($userModel->userExists(null, $email)) {
        header("Location: ?url=users&error=email_duplicado&email=$email");
        exit();
    }
    
    $userModel->add($nombre, $email, $password);
    header("Location: ?url=users&success=add");
    exit();
}

function edit() {
    global $userModel;
    
    $fields = ['id', 'nombre', 'email'];
    foreach ($fields as $f) {
        if (empty($_POST[$f])) {
            header("Location: ?url=users&error=missing_field&field=$f");
            exit();
        }
    }

    $id = (int)$_POST['id'];
    $nombre = trim($_POST['nombre']);
    $email = trim($_POST['email']);
    $password = $_POST['password'] ?? null;

    $userModel->update($id, $nombre, $email, $password);
    header("Location: ?url=users&success=edit");
    exit();
}

function delete() {
    global $userModel;
    
    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        header("Location: ?url=users&error=invalid_id");
        exit();
    }
    
    $id = (int)$_GET['id'];
    $userModel->delete($id);
    header("Location: ?url=users&success=delete");
    exit();
}

// =================================================================
// ⚡ Funciones AJAX
// =================================================================
function get_users() {
    global $userModel;
    
    // Set header first
    header('Content-Type: application/json; charset=utf-8');
    
    try {
        if (isset($_GET['id'])) {
            $user = $userModel->getById((int)$_GET['id']);
            if (!$user) {
                throw new Exception("Usuario no encontrado");
            }
            echo json_encode(['success' => true, 'users' => [$user]]);
        } else {
            $users = $userModel->getAll();
            // Make sure $users is an array of objects with 'id', 'nombre', 'email'
            echo json_encode(['success' => true, 'users' => $users]);
        }
    } catch (Exception $e) {
        // Output error as JSON, not HTML
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit(); // Prevent any extra output
}

function add_ajax() {
    global $userModel;
    
    header('Content-Type: application/json; charset=utf-8');
    
    try {
        $nombre = trim($_POST['nombre'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? null;

        if (empty($nombre) || empty($email) || empty($password)) {
            throw new Exception("Nombre, email y contraseña son requeridos");
        }

        if ($userModel->userExists(null, $email)) {
            throw new Exception("El email ya está registrado");
        }
        
        $userModel->add($nombre, $email, $password);
        $user = ['id' => $userModel->getLastInsertId() ?? 0, 'nombre' => $nombre, 'email' => $email];
        
        echo json_encode(['success' => true, 'message' => 'Usuario agregado', 'user' => $user]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

function delete_ajax() {
    global $userModel;
    
    header('Content-Type: application/json; charset=utf-8');
    
    try {
        if (empty($_POST['id']) || !is_numeric($_POST['id'])) {
            throw new Exception("ID inválido");
        }
        
        $id = (int)$_POST['id'];
        if (!$userModel->userExists($id)) {
            throw new Exception("No existe el usuario");
        }
        
        $userModel->delete($id);
        echo json_encode(['success' => true, 'message' => 'Usuario eliminado', 'userId' => $id]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

// 🚀 Ejecutar la acción solicitada
$action = $_GET['action'] ?? 'index';
if (function_exists($action)) {
    call_user_func($action);
} else {
    // Si la acción no existe, cargar la vista principal
    index();
}
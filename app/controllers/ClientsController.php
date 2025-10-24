<?php
// filepath: c:\xampp\htdocs\AJAX\app\controllers\ClientsController.php
require_once __DIR__ . '/../models/Clients.php';
use Ajax\models\Clients;

// ✅ Inicializa el modelo
$clientsModel = new Clients();

// =================================================================
// 🔹 Acción principal (vista)
// =================================================================
function index() {
    // Esta función solo carga la plantilla de la vista
    require __DIR__ . '/../views/clients-admin.php';
}

// 🚀 Enrutamiento principal (DEBE IR AL FINAL PARA QUE LAS FUNCIONES ESTÉN DISPONIBLES)
handleRequest($clientsModel);
// Si handleRequest procesa un POST o un AJAX, saldrá con exit().
// Si no, la ejecución continuará y caerá en el caso por defecto (index) si no se encontró una acción.

// =================================================================
// 🧭 Función principal de enrutamiento
// =================================================================
function handleRequest($clientsModel) {
    // Limpiamos la acción
    $action = $_REQUEST['action'] ?? '';

    // Verificamos si es una solicitud AJAX
    $isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
        strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

    try {
        if ($isAjax) {
            // ==================
            // CASOS AJAX
            // ==================
            header('Content-Type: application/json; charset=utf-8');
            switch ("{$_SERVER['REQUEST_METHOD']}_$action") {
                case 'POST_add_ajax':    handleAddEditAjax($clientsModel, 'add'); break;
                case 'POST_edit_ajax':   handleAddEditAjax($clientsModel, 'edit'); break;
                case 'POST_delete_ajax': handleDeleteAjax($clientsModel); break;

                // Caso para cargar la tabla, solicitado por JS
                case 'GET_get_clients':  getClientsAjax($clientsModel); break;

                default:
                    echo json_encode(['success' => false, 'message' => 'Acción AJAX inválida']);
                    http_response_code(400); // Bad Request
                    exit();
            }
        } else {
            // ==================
            // CASOS NORMALES (POST/GET con acción)
            // ==================
            switch ("{$_SERVER['REQUEST_METHOD']}_$action") {
                case 'POST_add':   handleAddEdit($clientsModel, 'add'); break;
                case 'POST_edit':  handleAddEdit($clientsModel, 'edit'); break;
                case 'GET_delete': handleDelete($clientsModel); break;

                // 🔥 SOLUCIÓN: Si es GET y no hay acción, o la acción no fue manejada,
                // forzamos la carga de la vista principal.
                default:
            }
        }
    } catch (Exception $e) {
        if ($isAjax) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error del servidor: ' . $e->getMessage()]);
        } else {
            // Redirigir o mostrar un error en la vista normal
            die("Error: " . $e->getMessage());
        }
        exit();
    }
}

// =================================================================
// 🧱 Funciones CRUD normales (no AJAX)
// =================================================================
function handleAddEdit($clientsModel, $mode) {
    $fields = ['nombre', 'apellido', 'cedula'];
    if ($mode === 'edit') $fields[] = 'id';

    foreach ($fields as $f) {
        if (empty($_POST[$f])) throw new Exception("El campo '$f' es requerido");
    }

    $id = (int)($_POST['id'] ?? 0);
    $nombre = trim($_POST['nombre']);
    $apellido = trim($_POST['apellido']);
    $cedula = trim($_POST['cedula']);

    if ($mode === 'add') {
        if ($clientsModel->clientExists(null, $cedula)) {
            header("Location: ?error=cedula_duplicada&cedula=$cedula");
            exit();
        }
        $clientsModel->add($nombre, $apellido, $cedula);
        header("Location: ?success=add");
        exit();
    } else {
        $clientsModel->update($id, $nombre, $apellido, $cedula);
        header("Location: ?success=edit");
        exit();
    }
}

function handleDelete($clientsModel) {
    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) throw new Exception("ID inválido");
    $id = (int)$_GET['id'];
    $clientsModel->delete($id);
    header("Location: ?success=delete");
    exit();
}

// =================================================================
// ⚡ Funciones AJAX
// =================================================================
function handleAddEditAjax($clientsModel, $mode) {
    $id = (int)($_POST['id'] ?? 0);
    $nombre = trim($_POST['nombre'] ?? '');
    $apellido = trim($_POST['apellido'] ?? '');
    $cedula = trim($_POST['cedula'] ?? '');

    if (empty($nombre) || empty($apellido) || empty($cedula)) {
        throw new Exception("Nombre, apellido y cédula son requeridos");
    }

    // Validar formato de cédula (DNI venezolano: 7-8 números)
    if (!preg_match('/^[0-9]{7,8}$/', $cedula)) {
        throw new Exception("La cédula debe tener entre 7 y 8 números");
    }

    if ($mode === 'edit' && $id === 0) throw new Exception("ID de cliente inválido");

    if ($mode === 'add') {
        if ($clientsModel->clientExists(null, $cedula)) {
            throw new Exception("La cédula ya está registrada");
        }
        $clientsModel->add($nombre, $apellido, $cedula);
        $client = ['id' => $clientsModel->getLastInsertId() ?? 0, 'nombre' => $nombre, 'apellido' => $apellido, 'cedula' => $cedula];
        $msg = 'Cliente agregado';
    } else {
        $clientsModel->update($id, $nombre, $apellido, $cedula);
        $client = ['id' => $id, 'nombre' => $nombre, 'apellido' => $apellido, 'cedula' => $cedula];
        $msg = 'Cliente actualizado';
    }

    echo json_encode(['success' => true, 'message' => $msg, 'client' => $client]);
    exit();
}

function handleDeleteAjax($clientsModel) {
    if (empty($_POST['id']) || !is_numeric($_POST['id'])) throw new Exception("ID inválido");
    $id = (int)$_POST['id'];
    if (!$clientsModel->clientExists($id)) throw new Exception("No existe el cliente");
    $clientsModel->delete($id);
    echo json_encode(['success' => true, 'message' => 'Cliente eliminado', 'clientId' => $id]);
    exit();
}

function getClientsAjax($clientsModel) {
    if (isset($_GET['id'])) {
        $client = $clientsModel->getById((int)$_GET['id']);
        if (!$client) throw new Exception("Cliente no encontrado");
        echo json_encode(['success' => true, 'clients' => [$client]]);
        exit();
    }

    $clients = $clientsModel->getAll();
    echo json_encode(['success' => true, 'clients' => $clients, 'count' => count($clients)]);
    exit();
}
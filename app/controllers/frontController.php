<?php

namespace Ajax\controllers;

use Exception;

class FrontController {
    private $controllerName; 
    private $action;         
    private $params = [];

    public function __construct() {

        if (!defined('ROOT_PATH')) {
            define('ROOT_PATH', dirname(__DIR__, 2) . '/');
        }

        $this->parseUrl();
        $this->loadController();
    }

    private function parseUrl(): void {
        $requestUri = $_SERVER['REQUEST_URI'] ?? '/';
        $uri = parse_url($requestUri, PHP_URL_PATH);

        $base = '/AJAX/';
        if (stripos($uri, $base) === 0) {
            $uri = substr($uri, strlen($base));
        }

        $segments = array_values(array_filter(explode('/', $uri)));

        if (empty($segments)) {

            $this->controllerName = 'users'; 
            $this->action = 'index';
            return;
        }


        $this->controllerName = $this->sanitize($segments[0]); 
        $this->action = $this->sanitize($segments[1] ?? 'index'); 
        $this->params = array_slice($segments, 2); 
    }

    private function loadController(): void {
        $controllerFile = ROOT_PATH . "app/controllers/" . ucfirst($this->controllerName) . "Controller.php";

        if (!file_exists($controllerFile)) {
            $this->renderNotFound("El archivo del controlador '{$this->controllerName}' no existe en la ruta esperada.");
            return;
        }

        require_once $controllerFile;

        if (!function_exists($this->action)) {
            $this->renderNotFound("La función '{$this->action}()' no existe en el controlador '{$this->controllerName}'.");
            return;
        }

        try {
            call_user_func_array($this->action, $this->params);
        } catch (Exception $e) {
            http_response_code(500);
            error_log("Internal Error in {$this->controllerName}/{$this->action}: " . $e->getMessage());
            echo "<h1>Error 500</h1><p>Ha ocurrido un error interno. Por favor, consulte los registros (logs).</p>";
            exit();
        }
    }

    private function sanitize(string $input): string {
        return preg_replace('/[^a-zA-Z0-9_]/', '', $input);
    }

    private function renderNotFound(string $message, bool $isAjax = false): void {
        http_response_code(404);

        if ($isAjax) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => $message]);
        } else {
            echo "<h1>Error 404 - Recurso No Encontrado</h1><p>$message</p>";
        }
        exit();
    }
}

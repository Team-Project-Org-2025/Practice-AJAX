<?php

namespace Ajax\controllers;

use Exception;

class FrontController {
    private $dir;
    private $controller;
    private $url;

    public function __construct() {
        // Definir ROOT_PATH si no existe
        if (!defined('ROOT_PATH')) {
            define('ROOT_PATH', dirname(__DIR__, 2) . '/');
        }

        // Si existe y no está vacía una request con el nombre de url
        if (isset($_REQUEST["url"])) {
            // Se asigna el valor de la request a la variable url
            $this->url = $_REQUEST["url"];
            
            // Directorio donde se encuentran los controladores
            $this->dir = ROOT_PATH . 'app/controllers/';
            
            // Concatenación del nombre del controlador con el nombre de la clase
            $this->controller = 'Controller.php';
            
            // Se ejecuta el método getURL que se encarga de cargar el controlador correspondiente
            $this->getURL();
        } else {
            // Si no existe la request, redirigir al controlador por defecto
            header("Location: ?url=users");
            exit();
        }
    }

    private function getURL(): void {
        // Construir la ruta completa del controlador
        $controllerPath = $this->dir . ucfirst($this->url) . $this->controller;
        
        // Si existe el controlador en la carpeta de controladores
        if (file_exists($controllerPath)) {
            // Se llama al controlador correspondiente
            require_once($controllerPath);
        } else {
            // Si no existe, redirigir al controlador por defecto
            header("Location: ?url=users");
            exit();
        }
    }
}
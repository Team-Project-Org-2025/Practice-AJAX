<?php
// Define una variable de ruta base si no existe (ajusta 'AJAX-Practice' a tu directorio real)
$base_url = '/AJAX/'; 
// O si estás usando una función helper: $base_url = get_base_url();
?>
<nav class="sidebar" id="sidebar">
    <div class="sidebar-sticky">
        <div class="sidebar-header">
            <h3>GARAGE<span>BARKI</span></h3>
            <p class="mb-0">Panel de Administración</p>
        </div>
        <ul class="nav flex-column">
            <li class="nav-item">
                <!-- Usando la variable de ruta base: -->
                <a class="nav-link" href="/AJAX/">
                    <i class="fas fa-user-shield"></i>
                    Usuarios
                </a>
            </li>
        </ul>
    </div>
</nav>

<?php $pageTitle = "Clientes | Garage Barki"; ?>
<?php require_once __DIR__ . '../partials/header-admin.php'; ?>
<?php require_once __DIR__ . '../partials/navbar-admin.php'; ?>

<div class="main-content">
    <div class="container-fluid py-4">

        <!-- Título + Botón -->
        <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3 fw-bold text-dark mb-0">
            <i class="fas fa-user-friends text-primary me-2"></i> Gestión de Clientes
        </h1>
        <button class="btn btn-primary rounded-pill px-4 shadow-sm"
            data-bs-toggle="modal" data-bs-target="#addClientModal">
            <i class="fas fa-plus me-2"></i> Nuevo Cliente
        </button>
        </div>

        <!-- Tabla de Clientes -->
        <div class="card border-0 shadow-sm">
        <div class="card-body">
            <table id="clientsTable" class="table table-striped table-hover w-100 align-middle">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody></tbody>
            </table>
        </div>
        </div>

    </div>
</div>

<!-- Modal para Agregar Clientes -->
<div class="modal fade" id="addClientModal" tabindex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="addClientModalLabel">
            <i class="fas fa-user-plus me-2"></i>Agregar Cliente
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="addClientForm">
            <div class="modal-body">
            <div class="mb-3">
                <label for="addClientName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="addClientName" name="nombre" required>
            </div>
            <div class="mb-3">
                <label for="addClientApellido" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="addClientApellido" name="apellido" required>
            </div>
            <div class="mb-3">
                <label for="addClientCedula" class="form-label">Cédula</label>
                <input type="text" class="form-control" id="addClientCedula" name="cedula" required>
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
        </div>
    </div>
</div>

<!-- Modal para Editar Clientes  -->
<div class="modal fade" id="editClientModal" tabindex="-1" aria-labelledby="editClientModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="editClientModalLabel">
            <i class="fas fa-edit me-2"></i>Editar Cliente
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="editClientForm">
            <input type="hidden" id="editClientId" name="id">
            <div class="modal-body">
            <div class="mb-3">
                <label for="editClientName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="editClientName" name="nombre" required>
            </div>
            <div class="mb-3">
                <label for="editClientApellido" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="editClientApellido" name="apellido" required>
            </div>
            <div class="mb-3">
                <label for="editClientCedula" class="form-label">Cédula</label>
                <input type="text" class="form-control" id="editClientCedula" name="cedula">
            </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Actualizar</button>
            </div>
        </form>
        </div>
    </div>
</div>

<script src="/AJAX/public/assets/js/jquery.min.js"></script>
<script src="/AJAX/public/assets/js/bootstrap.bundle.min.js"></script>
<script src="/AJAX/public/assets/js/dataTables.min.js"></script>
<script src="/AJAX/public/assets/js/dataTables.bootstrap5.min.js"></script>
<script src="/AJAX/public/assets/js/clients-admin.js"></script>
<script src="/AJAX/public/assets/js/validaciones.js"></script>

</body>
</html>
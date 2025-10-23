<?php $pageTitle = "Usuarios | Garage Barki"; ?>
<?php require_once __DIR__ . '../partials/header-admin.php'; ?>
<?php require_once __DIR__ . '../partials/navbar-admin.php'; ?>

<div class="main-content">
  <div class="container-fluid py-4">

    <!-- Título + Botón -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 fw-bold text-dark mb-0">
        <i class="fas fa-users text-primary me-2"></i> Gestión de Usuarios
      </h1>
      <button class="btn btn-primary rounded-pill px-4 shadow-sm"
        data-bs-toggle="modal" data-bs-target="#addUserModal">
        <i class="fas fa-plus me-2"></i> Nuevo Usuario
      </button>
    </div>

    <!-- Tabla de Usuarios -->
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <table id="usersTable" class="table table-striped table-hover w-100 align-middle text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

  </div>
</div>

<!-- Modal para Agregar Usuario -->
<div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addUserModalLabel">
          <i class="fas fa-user-plus me-2"></i>Agregar Usuario
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="addUserForm">
        <div class="modal-body">
          <div class="mb-3">
            <label for="addUserName" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="addUserName" name="nombre" required>
          </div>
          <div class="mb-3">
            <label for="addUserEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="addUserEmail" name="email" required>
          </div>
          <div class="mb-3">
            <label for="addUserPassword" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="addUserPassword" name="password" required>
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

<!-- Modal para Editar Usuario (por si lo necesitas después) -->
<div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editUserModalLabel">
          <i class="fas fa-edit me-2"></i>Editar Usuario
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="editUserForm">
        <input type="hidden" id="editUserId" name="id">
        <div class="modal-body">
          <div class="mb-3">
            <label for="editUserName" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="editUserName" name="nombre" required>
          </div>
          <div class="mb-3">
            <label for="editUserEmail" class="form-label">Email</label>
            <input type="email" class="form-control" id="editUserEmail" name="email" required>
          </div>
          <div class="mb-3">
            <label for="editUserPassword" class="form-label">Contraseña (dejar en blanco para no cambiar)</label>
            <input type="password" class="form-control" id="editUserPassword" name="password">
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
<script src="/AJAX/public/assets/js/users-admin.js"></script>
<script src="/AJAX/public/assets/js/validaciones.js"></script>



</body>
</html>
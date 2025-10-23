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

<!-- MODALES (sin cambios por ahora) -->

<!-- Scripts -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- DataTables -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
<script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="/AJAX/public/assets/js/users-admin.js"></script>

</body>
</html>

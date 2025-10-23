$(document).ready(function () {

  // ✅ CORREGIDO: Usar el FrontController con parámetros
 const baseUrl = "/AJAX/app/controllers/UsersController.php";

  // ============================================================
  // 🧩 Inicializar DataTable
  // ============================================================
  const table = $('#usersTable').DataTable({
    ajax: {
      url: baseUrl,
      type: "GET",
      data: { 
        url: "users",  // ✅ Agregar parámetro 'url'
        action: "get_users" 
      },
      dataType: "json",
      dataSrc: function (json) {
        if (!json.success) {
          console.error("❌ Error al obtener usuarios:", json.message);
          return [];
        }
        return json.users;
      }
    },
    columns: [
      { data: "id" },
      { data: "nombre" },
      { data: "email" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-danger btn-sm deleteUserBtn" data-id="${data.id}">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          `;
        }
      }
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json"
    },
    responsive: true
  });

  // ============================================================
  // ➕ AGREGAR USUARIO - CORREGIDO
  // ============================================================
  $("#addUserForm").on("submit", function (e) {
    e.preventDefault();

    // ✅ CORREGIDO: Agregar parámetros url y action al formData
    const formData = $(this).serialize() + "&url=users&action=add_ajax";

    $.ajax({
      url: baseUrl,
      type: "POST",
      data: formData,
      dataType: "json",
      success: function (response) {
        if (response.success) {
          // Si no tienes SweetAlert, usa alert normal
          alert("Usuario agregado: " + response.message);
          $("#addUserModal").modal("hide");
          $("#addUserForm")[0].reset();
          table.ajax.reload();
        } else {
          alert("Error: " + response.message);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error completo:", xhr.responseText);
        alert("Error al agregar usuario: " + error);
      }
    });
  });

  // ============================================================
  // 🗑️ ELIMINAR USUARIO - CORREGIDO
  // ============================================================
  $("#usersTable").on("click", ".deleteUserBtn", function () {
    const id = $(this).data("id");

    if (!confirm("¿Está seguro de eliminar este usuario?")) return;

    $.ajax({
      url: baseUrl,
      type: "POST",
      data: { 
        url: "users",  // ✅ Agregar parámetro 'url'
        action: "delete_ajax", 
        id: id 
      },
      dataType: "json",
      success: function (response) {
        if (response.success) {
          alert("Eliminado: " + response.message);
          table.ajax.reload();
        } else {
          alert("Error: " + response.message);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error completo:", xhr.responseText);
        alert("Error al eliminar usuario: " + error);
      }
    });
  });

});
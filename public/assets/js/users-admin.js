$(document).ready(function () {

  // Base del controlador PHP (ajustado a tu estructura MVC)
  const baseUrl = "/AJAX/app/controllers/UsersController.php";

  // ============================================================
  // 🧩 Inicializar DataTable
  // ============================================================
  const table = $('#usersTable').DataTable({
    ajax: {
      url: baseUrl,
      type: "GET",
      data: { action: "get_users" },
      dataType: "json",
      headers: { "X-Requested-With": "XMLHttpRequest" },
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
            <button class="btn btn-warning btn-sm editUserBtn" data-id="${data.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm deleteUserBtn" data-id="${data.id}">
              <i class="fas fa-trash"></i>
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
  // ➕ AGREGAR USUARIO
  // ============================================================
  $("#addUserForm").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      url: baseUrl,
      type: "POST",
      data: $(this).serialize() + "&action=add_ajax",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      dataType: "json",
      success: function (response) {
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Usuario agregado",
            text: response.message,
            timer: 1500,
            showConfirmButton: false
          });
          $("#addUserModal").modal("hide");
          $("#addUserForm")[0].reset();
          table.ajax.reload();
        } else {
          Swal.fire("Error", response.message, "error");
        }
      },
      error: function (xhr) {
        console.error(xhr.responseText);
        Swal.fire("Error", "No se pudo agregar el usuario.", "error");
      }
    });
  });

  // ============================================================
  // ✏️ CARGAR DATOS PARA EDITAR
  // ============================================================
  $("#usersTable").on("click", ".editUserBtn", function () {
    const id = $(this).data("id");

    $.ajax({
      url: baseUrl,
      type: "GET",
      data: { action: "get_users", id },
      headers: { "X-Requested-With": "XMLHttpRequest" },
      dataType: "json",
      success: function (res) {
        if (res.success && res.users.length > 0) {
          const user = res.users[0];
          $("#editUserId").val(user.id);
          $("#editUserName").val(user.nombre);
          $("#editUserEmail").val(user.email);
          $("#editUserPassword").val("");
          $("#editUserModal").modal("show");
        } else {
          Swal.fire("Error", "Usuario no encontrado.", "error");
        }
      },
      error: function () {
        Swal.fire("Error", "No se pudieron obtener los datos del usuario.", "error");
      }
    });
  });

  // ============================================================
  // 💾 GUARDAR CAMBIOS EN EDICIÓN
  // ============================================================
  $("#editUserForm").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      url: baseUrl,
      type: "POST",
      data: $(this).serialize() + "&action=edit_ajax",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      dataType: "json",
      success: function (response) {
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Usuario actualizado",
            text: response.message,
            timer: 1500,
            showConfirmButton: false
          });
          $("#editUserModal").modal("hide");
          table.ajax.reload();
        } else {
          Swal.fire("Error", response.message, "error");
        }
      },
      error: function (xhr) {
        console.error(xhr.responseText);
        Swal.fire("Error", "No se pudo actualizar el usuario.", "error");
      }
    });
  });

  // ============================================================
  // 🗑️ ELIMINAR USUARIO
  // ============================================================
  $("#usersTable").on("click", ".deleteUserBtn", function () {
    const id = $(this).data("id");

    Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: baseUrl,
          type: "POST",
          data: { action: "delete_ajax", id },
          headers: { "X-Requested-With": "XMLHttpRequest" },
          dataType: "json",
          success: function (response) {
            if (response.success) {
              Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: response.message,
                timer: 1500,
                showConfirmButton: false
              });
              table.ajax.reload();
            } else {
              Swal.fire("Error", response.message, "error");
            }
          },
          error: function (xhr) {
            console.error(xhr.responseText);
            Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
          }
        });
      }
    });
  });

});

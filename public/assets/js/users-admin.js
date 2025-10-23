$(document).ready(function () {

  const baseUrl = "/AJAX/users/";

  const table = $('#usersTable').DataTable({
    ajax: {
      url: baseUrl + "get_users",
      type: "GET",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      dataSrc: function (json) {
        if (!json.success) {
          console.error("❌ Error al obtener usuarios", json.message);
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
    }
  });

  // ✅ AGREGAR USUARIO
  $("#addUserForm").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      url: baseUrl + "add_ajax",
      type: "POST",
      data: $(this).serialize(),
      headers: { "X-Requested-With": "XMLHttpRequest" },
      dataType: "json",
      success: function (response) {
        alert(response.message);
        if (response.success) {
          $("#addUserModal").modal("hide");
          $("#addUserForm")[0].reset();
          table.ajax.reload();
        }
      }
    });
  });

  // ✅ CARGAR DATOS DEL USUARIO A EDITAR
  $("#usersTable").on("click", ".editUserBtn", function () {
    const id = $(this).data("id");

    $.ajax({
      url: baseUrl + "get_users",
      type: "GET",
      data: { id },
      headers: { "X-Requested-With": "XMLHttpRequest" },
      dataType: "json",
      success: function (res) {
        const user = res.users[0];

        $("#editUserIdHidden").val(user.id);
        $("#editUserId").val(user.id);
        $("#editUserName").val(user.nombre);
        $("#editUserEmail").val(user.email);
        $("#editUserPassword").val("");

        $("#editUserModal").modal("show");
      }
    });
  });

  // ✅ EDITAR USUARIO
  $("#editUserForm").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      url: baseUrl + "edit_ajax",
      type: "POST",
      data: $(this).serialize(),
      headers: { "X-Requested-With": "XMLHttpRequest" },
      dataType: "json",
      success: function (response) {
        alert(response.message);
        if (response.success) {
          $("#editUserModal").modal("hide");
          table.ajax.reload();
        }
      }
    });
  });

  // ✅ ELIMINAR USUARIO
  $("#usersTable").on("click", ".deleteUserBtn", function () {
    const id = $(this).data("id");

    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    $.ajax({
      url: baseUrl + "delete_ajax",
      type: "POST",
      data: { id },
      headers: { "X-Requested-With": "XMLHttpRequest" },
      dataType: "json",
      success: function (response) {
        alert(response.message);
        if (response.success) {
          table.ajax.reload();
        }
      }
    });
  });

});

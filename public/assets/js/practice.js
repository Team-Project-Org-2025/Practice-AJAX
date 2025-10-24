$(document).ready(function () {
    const baseUrl = "/AJAX/app/controllers/UsersController.php";

    const table = $('#usersTable').DataTable({
        ajax: {
            url: baseUrl,
            data: { action: "get_users" },
            dataSrc: "users"
        },
        columns: [
            { data: "id" },
            { data: "nombre" },
            { data: "email" },
            {
                data: "id",
                render: function (data) {
                    return `<button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${data})">Eliminar</button>`;
                }
            }
        ]
    });

    $("#addUserForm").on("submit", function (e) {
        e.preventDefault();
        
        const datos = {
            nombre: $("#addUserName").val(),
            email: $("#addUserEmail").val(),
            password: $("#addUserPassword").val()
        };

        const error = validarFormulario(datos);
        if (error) {
            alert(error);
            return;
        }

        $.ajax({
            url: baseUrl,
            type: "POST",
            data: { ...datos, action: "add_ajax" },
            success: function (response) {
                alert(response.message);
                $("#addUserModal").modal("hide");
                $("#addUserForm")[0].reset();
                table.ajax.reload();
            },
            error: function () {
                alert("Error al agregar usuario");
            }
        });
    });

    window.eliminarUsuario = function(id) {
        if (!confirm("¿Eliminar usuario?")) return;

        $.ajax({
            url: baseUrl,
            type: "POST",
            data: { action: "delete_ajax", id: id },
            success: function (response) {
                alert(response.message);
                table.ajax.reload();
            },
            error: function () {
                alert("Error al eliminar usuario");
            }
        });
    }
});
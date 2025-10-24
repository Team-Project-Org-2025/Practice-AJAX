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
  
// filepath: /AJAX/public/assets/js/users-admin.js
$(document).ready(function() {
    // URL base para las peticiones AJAX
    const baseUrl = '?url=users&action=';

    // Inicializar DataTable
    const tblUser = $('#usersTable').DataTable({
        ajax: {
            url: baseUrl + 'get_users',
            method: 'GET',
            dataSrc: 'users'
        },
        columns: [
            { data: 'id' },
            { data: 'nombre' },
            { data: 'email' },
            { 
                data: null, 
                render: function(data) {
                    return `<button value="${data.id}" class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>`;
                }
            }
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
        }
    });

    // Eliminar usuario
    $(document).on('click', '.btn-eliminar', function() {
        if (!confirm('¿Está seguro de eliminar este usuario?')) return;
        
        const userId = $(this).val();
        
        $.ajax({
            url: baseUrl + 'delete_ajax',
            method: 'POST',
            data: { id: userId },
            success: function(response) {
                alert(response.message);
                tblUser.ajax.reload();
            },
            error: function() {
                alert('Error al eliminar usuario');
            }
        });
    });

    // Agregar usuario
    $('#addUserForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            nombre: $('#addUserName').val(),
            email: $('#addUserEmail').val(),
            password: $('#addUserPassword').val()
        };

        $.ajax({
            url: baseUrl + 'add_ajax',
            method: 'POST',
            data: formData,
            success: function(response) {
                alert(response.message);
                $('#addUserModal').modal('hide');
                $('#addUserForm')[0].reset();
                tblUser.ajax.reload();
            },
            error: function() {
                alert('Error al agregar usuario');
            }
        });
    });
});
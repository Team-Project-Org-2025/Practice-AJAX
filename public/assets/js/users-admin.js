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
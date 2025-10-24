/**
 * Sistema de Gestión de Clientes - AJAX simple sin DataTables
 */

$(document).ready(function() {
    // Cargar clientes al iniciar
    loadClients();

    // ========================================
    // FUNCIONES BÁSICAS
    // ========================================

    function loadClients() {
        $.ajax({
            url: '/AJAX/clients',
            type: 'GET',
            data: {
                action: 'get_clients'
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    renderClientsTable(response.clients || []);
                } else {
                    showError('Error al cargar los clientes: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error AJAX:', error);
                showError('Error de conexión al cargar los clientes');
            }
        });
    }

    function renderClientsTable(clients) {
        const tbody = $('#clientsTable tbody');
        tbody.empty();

        if (clients.length === 0) {
            tbody.html('<tr><td colspan="5" class="text-center text-muted">No hay clientes registrados</td></tr>');
            return;
        }

        clients.forEach(function(client) {
            const row = `
                <tr>
                    <td class="text-center">${client.id}</td>
                    <td class="fw-semibold">${client.nombre}</td>
                    <td class="fw-semibold">${client.apellido}</td>
                    <td class="text-muted"><span class="badge bg-secondary">${client.cedula}</span></td>
                    <td class="text-center">
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-outline-primary edit-client"
                                    data-id="${client.id}"
                                    title="Editar Cliente">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-client"
                                    data-id="${client.id}"
                                    data-nombre="${client.nombre} ${client.apellido}"
                                    title="Eliminar Cliente">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function showError(message) {
        alert('Error: ' + message);
    }

    function showSuccess(message) {
        alert('Éxito: ' + message);
    }

    // ========================================
    // MANEJO DE FORMULARIOS
    // ========================================

    $('#addClientForm').on('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const nombre = formData.get('nombre').trim();
        const apellido = formData.get('apellido').trim();
        const cedula = formData.get('cedula').trim();

        if (!nombre || !apellido || !cedula) {
            showError('Todos los campos son requeridos');
            return;
        }

        if (!/^[0-9]{7,8}$/.test(cedula)) {
            showError('La cédula debe tener entre 7 y 8 números');
            return;
        }

        $.ajax({
            url: '/AJAX/clients',
            type: 'POST',
            data: {
                action: 'add_ajax',
                nombre: nombre,
                apellido: apellido,
                cedula: cedula
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    showSuccess(response.message);
                    $('#addClientForm')[0].reset();
                    $('#addClientModal').modal('hide');
                    loadClients();
                } else {
                    showError(response.message || 'Error al agregar el cliente');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error AJAX:', error);
                let errorMessage = 'Error de conexión';
                try {
                    const response = JSON.parse(xhr.responseText);
                    errorMessage = response.message || errorMessage;
                } catch (e) {}
                showError(errorMessage);
            }
        });
    });

    $('#editClientForm').on('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const id = formData.get('id');
        const nombre = formData.get('nombre').trim();
        const apellido = formData.get('apellido').trim();
        const cedula = formData.get('cedula').trim();

        if (!nombre || !apellido || !cedula) {
            showError('Todos los campos son requeridos');
            return;
        }

        if (!/^[0-9]{7,8}$/.test(cedula)) {
            showError('La cédula debe tener entre 7 y 8 números');
            return;
        }

        $.ajax({
            url: '/AJAX/clients',
            type: 'POST',
            data: {
                action: 'edit_ajax',
                id: id,
                nombre: nombre,
                apellido: apellido,
                cedula: cedula
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    showSuccess(response.message);
                    $('#editClientForm')[0].reset();
                    $('#editClientModal').modal('hide');
                    loadClients();
                } else {
                    showError(response.message || 'Error al actualizar el cliente');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error AJAX:', error);
                let errorMessage = 'Error de conexión';
                try {
                    const response = JSON.parse(xhr.responseText);
                    errorMessage = response.message || errorMessage;
                } catch (e) {}
                showError(errorMessage);
            }
        });
    });

    // ========================================
    // MANEJO DE BOTONES DE ACCIÓN
    // ========================================

    $('#clientsTable tbody').on('click', '.edit-client', function() {
        const clientId = $(this).data('id');

        $.ajax({
            url: '/AJAX/clients',
            type: 'GET',
            data: {
                action: 'get_clients',
                id: clientId
            },
            dataType: 'json',
            success: function(response) {
                if (response.success && response.clients.length > 0) {
                    const client = response.clients[0];

                    $('#editClientId').val(client.id);
                    $('#editClientName').val(client.nombre);
                    $('#editClientApellido').val(client.apellido);
                    $('#editClientCedula').val(client.cedula);

                    $('#editClientModal').modal('show');
                } else {
                    showError(response.message || 'Cliente no encontrado');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error AJAX:', error);
                showError('Error al obtener los datos del cliente');
            }
        });
    });

    $('#clientsTable tbody').on('click', '.delete-client', function() {
        const clientId = $(this).data('id');
        const clientName = $(this).data('nombre');

        if (confirm(`¿Desea eliminar al cliente "${clientName}"?`)) {
            $.ajax({
                url: '/AJAX/clients',
                type: 'POST',
                data: {
                    action: 'delete_ajax',
                    id: clientId
                },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        showSuccess(response.message);
                        loadClients();
                    } else {
                        showError(response.message || 'Error al eliminar el cliente');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error AJAX:', error);
                    let errorMessage = 'Error de conexión al eliminar el cliente';
                    try {
                        const response = JSON.parse(xhr.responseText);
                        errorMessage = response.message || errorMessage;
                    } catch (e) {}
                    showError(errorMessage);
                }
            });
        }
    });

    // ========================================
    // MANEJO DE MODALES
    // ========================================

    $('.modal').on('hidden.bs.modal', function() {
        $(this).find('form')[0].reset();
    });

    console.log('Sistema de clientes inicializado correctamente');
});
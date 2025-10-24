$(document).ready(function () {
    const baseUrl = "/AJAX/app/controllers/ClientsController.php";

    const table = $('#clientsTable').DataTable({
        ajax: {
            url: baseUrl,
            data: { action: "get_clients" },
            dataSrc: "clients"
        },
        columns: [
            { data: "id" },
            { data: "nombre" },
            { data: "apellido" },
            { data: "cedula" },
            {
                data: "id",
                render: function (data) {
                    return `
                        <button class="btn btn-warning btn-sm me-1" onclick="editarCliente(${data})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${data})" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                }
            }
        ]
    });

    // Formulario para agregar cliente
    $("#addClientForm").on("submit", function (e) {
        e.preventDefault();

        const datos = {
            nombre: $("#addClientName").val(),
            apellido: $("#addClientApellido").val(),
            cedula: $("#addClientCedula").val()
        };

        const error = validarFormularioClientes(datos);
        if (error) {
            alert(error);
            return;
        }

        $.ajax({
            url: baseUrl,
            type: "POST",
            data: { ...datos, action: "add_ajax" },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $("#addClientModal").modal("hide");
                    $("#addClientForm")[0].reset();
                    table.ajax.reload();
                } else {
                    alert("Error: " + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error AJAX:", error);
                alert("Error al agregar cliente. Por favor, inténtelo de nuevo.");
            }
        });
    });

    // Formulario para editar cliente
    $("#editClientForm").on("submit", function (e) {
        e.preventDefault();

        const datos = {
            id: $("#editClientId").val(),
            nombre: $("#editClientName").val(),
            apellido: $("#editClientApellido").val(),
            cedula: $("#editClientCedula").val()
        };

        const error = validarFormularioClientes(datos, true);
        if (error) {
            alert(error);
            return;
        }

        $.ajax({
            url: baseUrl,
            type: "POST",
            data: { ...datos, action: "edit_ajax" },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    $("#editClientModal").modal("hide");
                    $("#editClientForm")[0].reset();
                    table.ajax.reload();
                } else {
                    alert("Error: " + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error AJAX:", error);
                alert("Error al actualizar cliente. Por favor, inténtelo de nuevo.");
            }
        });
    });

    // Función para eliminar cliente
    window.eliminarCliente = function(id) {
        if (!confirm("¿Está seguro de que desea eliminar este cliente?")) return;

        $.ajax({
            url: baseUrl,
            type: "POST",
            data: { action: "delete_ajax", id: id },
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    table.ajax.reload();
                } else {
                    alert("Error: " + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error AJAX:", error);
                alert("Error al eliminar cliente. Por favor, inténtelo de nuevo.");
            }
        });
    };

    // Función para editar cliente
    window.editarCliente = function(id) {
        // Obtener datos del cliente para editar
        $.ajax({
            url: baseUrl,
            type: "GET",
            data: { action: "get_clients", id: id },
            success: function (response) {
                if (response.success && response.clients.length > 0) {
                    const cliente = response.clients[0];

                    // Llenar el formulario de edición
                    $("#editClientId").val(cliente.id);
                    $("#editClientName").val(cliente.nombre);
                    $("#editClientApellido").val(cliente.apellido);
                    $("#editClientCedula").val(cliente.cedula);

                    // Mostrar el modal de edición
                    $("#editClientModal").modal("show");
                } else {
                    alert("Error: No se pudo obtener la información del cliente");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error AJAX:", error);
                alert("Error al obtener información del cliente");
            }
        });
    };
});

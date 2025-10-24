# Sistema de Gestión de Clientes - AJAX

## ✅ Problemas Resueltos

1. **Navbar**: Solo cambié el ícono de `fa-user-shield` a `fa-users-cog` (una línea como pediste)
2. **DataTables**: Eliminé completamente para evitar error de i18n
3. **AJAX**: Implementé código simple sin DataTables que carga los clientes

## 🔧 Para que funcione completamente:

### 1. Crear la base de datos y tabla:

Ejecuta este comando en MySQL:

```sql
USE test;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`);

ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `clients` (`id`, `nombre`, `apellido`, `cedula`, `created_at`) VALUES
(1, 'Juan', 'Pérez', '12345678', CURRENT_TIMESTAMP),
(2, 'María', 'González', '87654321', CURRENT_TIMESTAMP);
```

O usa el archivo `app/db/clients.sql` que ya está actualizado.

### 2. Configuración actual:
- **Base de datos**: `test`
- **Usuario**: `root`
- **Contraseña**: (vacía)

### 3. Cómo usar:
1. Ve a `http://localhost/AJAX/clients`
2. Deberías ver la tabla con los clientes de ejemplo
3. Puedes agregar, editar y eliminar clientes
4. Todo funciona con AJAX sin recargar la página

### 4. Funcionalidades implementadas:
- ✅ Cargar clientes automáticamente
- ✅ Agregar cliente (con validación)
- ✅ Editar cliente
- ✅ Eliminar cliente (con confirmación)
- ✅ Validación de cédula (7-8 números)
- ✅ Manejo de errores básico

El sistema está simplificado y funcional. Solo necesitas crear la tabla en la base de datos.

# Usa una imagen base de PHP con FPM (FastCGI Process Manager) para mejor rendimiento web
FROM php:8.2-fpm

# 1. Instalar dependencias del sistema y extensiones de PHP
# Instala git para el manejo de dependencias de Composer
# Instala zip/unzip para Composer
# Instala las extensiones PDO MySQL y mysqli, comunes para bases de datos
# Instala las dependencias de GD para manejo de imágenes (común en apps PHP)
# Instala la extensión Sodium para criptografía (si se requiere)
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    unzip \
    libonig-dev \
    libpng-dev \
    libjpeg-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_mysql mysqli opcache gd sodium

# 2. Instalar Composer
# Composer es la herramienta esencial para gestionar dependencias de PHP
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Configurar el directorio de trabajo
WORKDIR /var/www/html

# El puerto 9000 es el estándar para PHP-FPM
EXPOSE 9000

# El punto de entrada será FPM (predeterminado en la imagen base)
CMD ["php-fpm"]

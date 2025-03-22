# Stage 1: Build
FROM composer:latest AS build

# Set the working directory
WORKDIR /app

# Copy composer.json and composer.lock from the backend directory
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Stage 2: Runtime
FROM php:8.1-cli

# Set the working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
      unzip \
      curl \
      git \
      && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy Composer dependencies from the build stage
COPY --from=build /app/vendor ./vendor



# Set permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Expose port (if needed)
EXPOSE 8000

# Start PHP built-in server (or your custom entrypoint)
CMD ["php", "-S", "0.0.0.0:8000", "-t", "/var/www/html/public"]
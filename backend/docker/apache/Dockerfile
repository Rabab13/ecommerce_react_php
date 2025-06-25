FROM php:8.1-cli

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working dir
WORKDIR /var/www/html

# Copy app code
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Expose port (only if needed, e.g., with PHP server for dev)
EXPOSE 8080


CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]

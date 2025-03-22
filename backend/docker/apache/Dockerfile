FROM php:8.1-fpm

# Set the working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
      unzip \
      curl \
      git \
      gettext \
      && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Optional: Xdebug only for dev
# RUN pecl install xdebug-3.1.5 && docker-php-ext-enable xdebug
COPY . .

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy only Composer files first (for dependency cache)
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader


# Set permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html


# Expose port for Cloud Run
EXPOSE 8080

# Start PHP built-in server (serving /var/www/html/public)
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]

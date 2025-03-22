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

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer



COPY ./composer.json ./
# Skip the lock file
# COPY ./composer.lock ./

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy application files
# COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html
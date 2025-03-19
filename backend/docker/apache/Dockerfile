FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
      apache2-utils \
      unzip \
      curl \
      git \
      gettext \ 
      && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Xdebug (optional in prod, but okay for dev/staging)
RUN pecl install xdebug-3.1.5 && docker-php-ext-enable xdebug

# Enable Apache modules
RUN a2enmod rewrite headers

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy app code
COPY . .

# Explicitly copy .env (only once)
COPY .env /var/www/html/.env

# Copy specific folders (if needed — safe to remove if already copied above)
# COPY . /var/www/html

# COPY ./public /var/www/html/public
# COPY ./src /var/www/html/src
# COPY ./vendor /var/www/html/vendor

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Apache server config
COPY docker/apache/servername.conf /etc/apache2/conf-available/servername.conf
RUN a2enconf servername.conf


# Startup script
COPY docker/apache/start.sh /start.sh
RUN chmod +x /start.sh


# Copy the template files
COPY docker/apache/ports.conf.template /etc/apache2/ports.conf.template
COPY docker/apache/000-default.conf.template /etc/apache2/sites-available/000-default.conf.template
# Expose port (Cloud Run ignores)
EXPOSE 8080


# Start script handles port binding
CMD ["/start.sh"]
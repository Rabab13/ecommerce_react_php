FROM php:8.1-apache

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Xdebug 3.1.5 (compatible with PHP 8.1)
RUN pecl install xdebug-3.1.5 \
      && docker-php-ext-enable xdebug

# Install apache2-utils for a2enmod command
RUN apt-get update && apt-get install -y apache2-utils

# Enable rewrite module
RUN a2enmod rewrite

# Debug: List contents of the build context
RUN ls -al /var/www

# Copy the Apache configuration files
COPY ./docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./docker/apache/servername.conf /etc/apache2/conf-available/servername.conf

# Enable the new configuration file
RUN ln -s /etc/apache2/conf-available/servername.conf /etc/apache2/conf-enabled/servername.conf

# Enable Apache modules
RUN a2enmod headers

# RUN a2enmod rewrite headers


# Copy the application files
COPY ./public /var/www/html
COPY ./src /var/www/src
COPY ./vendor /var/www/vendor

# Restart Apache
RUN service apache2 restart
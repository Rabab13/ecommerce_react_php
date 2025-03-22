FROM php:8.1-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
      unzip \
      curl \
      git \
      gettext \
      && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_mysql

# Optional: Xdebug only for dev
# RUN pecl install xdebug-3.1.5 && docker-php-ext-enable xdebug

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

COPY . .

RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

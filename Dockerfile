FROM composer as builder
WORKDIR /app
COPY ./app/composer.json .

ENV COMPOSER_ALLOW_SUPERUSER 1
RUN composer install --optimize-autoloader


FROM php:8.2-fpm-buster as base
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash

RUN apt-get update && apt-get install -y \
    gnupg \
    g++ \
    procps \
    openssl \
    git \
    unzip \
    zlib1g-dev \
    libzip-dev \
    libpq-dev \
    libfreetype6-dev \
    libpng-dev \
    libjpeg-dev \
    libicu-dev  \
    libonig-dev \
    libxslt1-dev \
    acl \
    symfony-cli \
    && echo 'alias sf="php bin/console"' >> ~/.bashrc

RUN docker-php-ext-configure gd --with-jpeg --with-freetype 

RUN docker-php-ext-install \
    pdo pdo_pgsql zip xsl gd intl opcache exif mbstring

WORKDIR /var/www/symfony
COPY ./app .
COPY --from=builder /app/vendor /var/www/symfony/vendor
COPY --from=builder /app/var /var/www/symfony/var

EXPOSE 8000

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "/bin/sh", "/var/www/symfony/entrypoint.sh" ]
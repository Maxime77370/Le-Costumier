FROM python:alpine as fakeData

WORKDIR /app
COPY ./app/generateProducts.py /app/script.py

RUN python /app/script.py


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
COPY . .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN composer install

EXPOSE 8000

COPY --from=fakeData /app/products.json /var/www/symfony/src/DataFixtures
COPY --from=fakeData /app/categories.json /var/www/symfony/src/DataFixtures

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "/bin/sh", "/var/www/symfony/entrypoint.sh" ]
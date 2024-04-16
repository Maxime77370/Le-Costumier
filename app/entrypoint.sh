#!/bin/bash

CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
    touch $CONTAINER_ALREADY_STARTED
    echo "-- First container startup --"
    php bin/console doctrine:database:drop --force
    php bin/console doctrine:database:create 
    php bin/console doctrine:schema:update --force
fi

echo "-- Starting the server --"
symfony server:start --no-tls
#!/bin/bash
CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then 
    touch $CONTAINER_ALREADY_STARTED 
    echo "-- First container startup --" 
    # Database
    php bin/console doctrine:database:drop --force 
    php bin/console doctrine:database:create  
    php bin/console doctrine:schema:update --force
    php bin/console doctrine:fixtures:load --no-interaction
    # JWT keys
    php bin/console lexik:jwt:generate-keypair
fi
echo "-- Starting the server --" 
symfony server:start --no-tls 
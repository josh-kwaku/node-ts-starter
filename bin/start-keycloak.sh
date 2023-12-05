#!/bin/bash

# Check if the .env file exists
if [ -f ../.env ]; then
    # Load variables from the .env file
    source ../.env
else
    echo "Error: .env file not found"
    exit 1
fi

docker run -p $AUTH_CLIENT_PORT:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:23.0.1 start-dev

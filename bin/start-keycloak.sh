#!/bin/bash

# Get the absolute path of the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if the .env file exists
if [ -f "$SCRIPT_DIR/../.env" ]; then
    # Load variables from the .env file
    source "$SCRIPT_DIR/../.env"
else
    echo "Error: .env file not found at $SCRIPT_DIR/../.env"
    exit 1
fi

docker run -p $AUTH_CLIENT_PORT:8080 -e KEYCLOAK_ADMIN=$AUTH_CLIENT_USERNAME -e KEYCLOAK_ADMIN_PASSWORD=$AUTH_CLIENT_PASSWORD quay.io/keycloak/keycloak:23.0.1 start-dev
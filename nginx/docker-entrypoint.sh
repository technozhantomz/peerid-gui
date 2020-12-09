#!/usr/bin/env bash

# Exit the script as soon as something fails.
set -e

# App name
PLACEHOLDER_FRONTEND_NAME="$FRONTEND_NAME"
PLACEHOLDER_BACKEND_NAME="$BACKEND_NAME"
PLACEHOLDER_BACKEND_PORT="$BACKEND_PORT"

# Load Balancer
PLACEHOLDER_VHOST="$VHOST"

# Where is our default config located?
DEFAULT_CONFIG_PATH="/etc/nginx/conf.d/default.conf"

# Replace all instances of the placeholders with the values above.
sed -i "s/PLACEHOLDER_VHOST/${PLACEHOLDER_VHOST}/g" "${DEFAULT_CONFIG_PATH}"
sed -i "s/PLACEHOLDER_FRONTEND_NAME/${PLACEHOLDER_FRONTEND_NAME}/g" "${DEFAULT_CONFIG_PATH}"
sed -i "s/PLACEHOLDER_BACKEND_NAME/${PLACEHOLDER_BACKEND_NAME}/g" "${DEFAULT_CONFIG_PATH}"
sed -i "s/PLACEHOLDER_BACKEND_PORT/${PLACEHOLDER_BACKEND_PORT}/g" "${DEFAULT_CONFIG_PATH}"

# Execute the CMD from the Dockerfile and pass in all of its arguments.
exec "$@"

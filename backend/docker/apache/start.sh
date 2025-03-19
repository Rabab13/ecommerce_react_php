#!/bin/bash

# Default port if not set
PORT=${PORT:-8080}

echo "Apache configured on port $PORT, doc root => /public"

# Replace placeholders in ports.conf and 000-default.conf
echo "Updating ports.conf..."
envsubst '${PORT}' < /etc/apache2/ports.conf.template > /etc/apache2/ports.conf
cat /etc/apache2/ports.conf

echo "Updating 000-default.conf..."
envsubst '${PORT}' < /etc/apache2/sites-available/000-default.conf.template > /etc/apache2/sites-available/000-default.conf
cat /etc/apache2/sites-available/000-default.conf

# Enable the default site
echo "Enabling 000-default.conf..."
a2ensite 000-default.conf

# Start Apache in foreground (so container stays alive)
echo "Starting Apache..."
exec apache2-foreground
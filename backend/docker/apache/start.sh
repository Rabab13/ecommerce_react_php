#!/bin/bash

# Exit on error
set -e

# Default port if not set
PORT=${PORT:-8080}

echo "🚀 Apache configured on port $PORT, document root => /var/www/html/public"

# Replace placeholders in ports.conf
echo "🔧 Updating ports.conf..."
if [ -f /etc/apache2/ports.conf.template ]; then
    envsubst '${PORT}' < /etc/apache2/ports.conf.template > /etc/apache2/ports.conf
    echo "✅ ports.conf updated:"
    cat /etc/apache2/ports.conf
else
    echo "❌ Error: /etc/apache2/ports.conf.template not found!"
    exit 1
fi

# Replace placeholders in 000-default.conf
echo "🔧 Updating 000-default.conf..."
if [ -f /etc/apache2/sites-available/000-default.conf.template ]; then
    envsubst '${PORT}' < /etc/apache2/sites-available/000-default.conf.template > /etc/apache2/sites-available/000-default.conf
    echo "✅ 000-default.conf updated:"
    cat /etc/apache2/sites-available/000-default.conf
else
    echo "❌ Error: /etc/apache2/sites-available/000-default.conf.template not found!"
    exit 1
fi

# Enable the default site
echo "🔧 Enabling 000-default.conf..."
a2ensite 000-default.conf > /dev/null

# Start Apache in foreground (so container stays alive)
echo "🚀 Starting Apache..."
exec apache2-foreground
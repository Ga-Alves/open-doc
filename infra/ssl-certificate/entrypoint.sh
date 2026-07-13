#!/bin/bash
set -e

DOMAIN="$APP_DOMAIN"
CERT_FILE="/etc/letsencrypt/live/$DOMAIN/fullchain.pem"

if [ -f "$CERT_FILE" ] && [ $(find "$CERT_FILE" -mtime -60) ]; then
    echo "Certificado criado há menos de 60 dias. Saindo."
    exit 0
fi

certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "$SSL_EMAIL" \
    -d "$APP_DOMAIN"
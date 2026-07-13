#!/bin/bash

trap 'echo "Encerrando..."; exit 0' SIGTERM SIGINT

while true; do
    echo "$(date): Executando renovação..."
    certbot renew \
        --webroot-path=/var/www/certbot \
        --non-interactive

    echo "$(date): Aguardando 24 horas..."
    sleep 86400
done
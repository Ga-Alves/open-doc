FROM certbot/certbot:latest

RUN apk add --no-cache bash curl

RUN mkdir -p /etc/nginx/ssl

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /etc/letsencrypt

ENTRYPOINT ["/entrypoint.sh"]
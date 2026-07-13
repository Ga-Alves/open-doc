FROM certbot/certbot:latest

RUN apk add --no-cache bash curl

COPY renew.sh /renew.sh

RUN chmod +x /renew.sh

WORKDIR /etc/letsencrypt

ENTRYPOINT ["/renew.sh"]
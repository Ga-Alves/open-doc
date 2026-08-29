FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 4444

ENTRYPOINT [ "node", "server.js" ]
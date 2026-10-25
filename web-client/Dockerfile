FROM node:24-alpine AS builder

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

ARG VITE_SIGNALING_SERVER_HOST
ENV VITE_SIGNALING_SERVER_HOST=$VITE_SIGNALING_SERVER_HOST

COPY . .

RUN npm ci
RUN npm run build

FROM node:24-alpine AS runtime

WORKDIR /app

RUN npm install --global serve@14.2.4
COPY --from=builder --chown=node:node /app/dist ./dist

USER node

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
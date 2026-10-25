# How to build?


## Define env variables
Run
```bash
cp .env.production.example .env.production
```
and complete the .env.production


## Start the stack
Point `APP_DOMAIN` to this server and make sure inbound TCP ports 80 and 443 are reachable. Traefik obtains and renews the Let's Encrypt certificate automatically using HTTP-01. Keep `APP_DOMAIN` before the frontend URL variables in `.env.production`, since the file is loaded with `source`.

```bash
source .env.production
docker compose up -d --build
```

## Feed first admin
Connect in the database container
```bash
docker exec -it infra-postgres-1 psql -U postgres -d open_doc
```


Generate a <your_encrypted_password> encrypted password and
feed the first admin
```bash
INSERT INTO users (id, name, email, encrypt_password, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Admin',
  'admin@mail.com',
  '<your_encrypted_password>',
  'ADMIN',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
```
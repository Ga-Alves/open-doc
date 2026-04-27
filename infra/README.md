# How to build?


## Define env variables
Run
```bash
cp .env.production.example .env.production
```
and complete the .env.production


## Compose up in all services
```bash
source .env.production
docker compose up -d
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
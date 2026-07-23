# How to run:

1 - create a `.env` file from `.env.example`.

2 - setup database
Replace the placeholders with your .env values!

```bash
docker container run -it \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB="$DB_NAME" \
  -e POSTGRES_USER="$DB_USER_NAME" \
  -p "$DB_PORT":5432 \
  --name postgres \
  -d postgres:latest
```

3 - Start the application

```bash
./mvnw spring-boot:run
```

## Test

```bash
./mvnw test
```

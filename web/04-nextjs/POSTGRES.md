# Postgres

Use docker to run a DB instance

```bash
docker pull postgres
```

Add `postgres` in `.gitignore` to map to container and preserve data.

Scripts to create container and start a container

```js
  // -v will map volume locally to preserve data
  "docker:init": "docker run --name rick-morty -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=Admin1234 -e POSTGRES_DB=rickmorty -p 5432:5432 -v ./postgres:/var/lib/postgresql/ -d postgres",
  // starts container previously created in case it was stopped
  "docker:start": "docker container start rick-morty",
```

```bash
# create container
npm run docker:init

# then to start container again just run
npm run docker:start
```

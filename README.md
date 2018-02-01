# keep-up

A platform to keep track of student activity

## Steps to run the project locally

- Setup PostgreSQL
- Restore the DB dump to get the schema setup

```
psql -U "anirudhbs" "keepup" < keepup.backup
```

- Setup `config.js` at the project root directory

```
module.exports = {
  token:
    <slack token>,
  postgres: {
    USER: "<db user / role name>",
    HOST: "<hostname>", // localhost
    DATABASE: "<db name>", // keepup
    PASSWORD: "<password>",
    PORT: "<port>" // 5432
  }
}

```

- Run `npm install`
- Run `npm run start` and `npm run start-react`

## References

- https://axiomq.com/blog/backup-and-restore-a-postgresql-database/

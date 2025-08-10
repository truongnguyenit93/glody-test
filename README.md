# glody-test

# How To Deploy

- `docker compose up -d`

# Notes

### App
- URL: http://localhost:3000

### phpMyAdmin
- URL: http://localhost:8080
- Server: `db`
- Username: `refactorian`
- Password: `refactorian`
- Database: `refactorian`

### migrate
- `npx typeorm-ts-node-commonjs migration:run --dataSource src/data-source.ts`
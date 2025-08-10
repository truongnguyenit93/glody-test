import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'refactorian',
    password: 'refactorian',
    database: 'refactorian',
    entities: ['./entitys/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
});

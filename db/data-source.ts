
// import { DataSource, DataSourceOptions } from "typeorm";


// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: `localhost`,
//   port: 5432,
//   username: `myuser`,
//   password: `mypassword`,
//   database: `mydatabase`,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/db/migrations/*{.ts,.js}'],
//   synchronize: false,
// };

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'mysql',
//   host: `localhost`,
//   port: 8889,
//   username: `root`,
//   password: `root`,
//   database: `temp_mig_test`,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   // migrations: ["dist/db/migrations/*{.ts,.js}"],
//   // migrations: ['db/migrations/*.ts'],
//   migrations: ['dist/db/migrations/*{.ts,.js}'],
//   synchronize: false,
    
// };

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;


// src/db/data-source.ts

// import { DataSource, DataSourceOptions } from 'typeorm';

// export const getDataSourceOptions = (
//   type: string,
//   host: string,
//   port: number,
//   username: string,
//   password: string,
//   database: string
// ): DataSourceOptions => ({
//   type: type as any,
//   host,
//   port,
//   username,
//   password,
//   database,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/db/migrations/*{.ts,.js}'],
//   synchronize: false,
// });

// You will use this function later in AppModule
// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;


import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const AppDataSource = new DataSource({
  type: 'postgres', // Make sure this matches your DB_TYPE in .env
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: false,

});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

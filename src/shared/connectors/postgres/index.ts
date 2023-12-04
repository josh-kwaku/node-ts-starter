// import { PostgresConfig } from './config';
// import { PostgresConnection } from './postgres';

// const configValues = new PostgresConfig().configValues;
// const postgresHandler = PostgresConnection.init({
//   username: configValues?.DB_USERNAME,
//   password: String(configValues?.DB_PASSWORD ?? ''),
//   port: configValues?.DB_PORT,
//   database: configValues?.DB_NAME,
//   schema: configValues?.DB_SCHEMA,
//   dialect: 'postgres'
// });

// const connectionInstance = postgresHandler.connectionInstance;

// (async () => {
//   await postgresHandler.checkConnection();
// })();

// export default postgresHandler;

// export { connectionInstance };

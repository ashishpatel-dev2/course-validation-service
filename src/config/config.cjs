module.exports = {
  development: {
    database: process.env.DB_NAME || 'validationdb',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }
};

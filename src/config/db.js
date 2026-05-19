import { Sequelize } from 'sequelize';
const dbConfig = {
  database: process.env.DB_NAME || 'validationdb',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  define: {
    underscored: true
  }
});

const escapeIdentifier = (name) => name.replace(/"/g, '""');

export const ensureDatabaseExists = async () => {
  const adminSequelize = new Sequelize('postgres', dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
  });

  try {
    const dbName = escapeIdentifier(dbConfig.database);

    await adminSequelize.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database "${dbConfig.database}" created.`);
  } catch (error) {
    if (error?.original?.code !== '42P04') {
      throw error;
    }
  } finally {
    await adminSequelize.close();
  }
};

export default sequelize;

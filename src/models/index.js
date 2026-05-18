import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;

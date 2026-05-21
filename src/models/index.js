import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import validationReportModel from './validationReport.js';
import validationResultModel from './validationResult.js';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.ValidationReport = validationReportModel(sequelize);
db.ValidationResult = validationResultModel(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

export default db;

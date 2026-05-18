import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import validationJobModel from './validationJob.js';
import validationResultModel from './validationResult.js';
import validationSummaryModel from './validationSummary.js';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.ValidationJob = validationJobModel(sequelize);
db.ValidationResult = validationResultModel(sequelize);
db.ValidationSummary = validationSummaryModel(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

export default db;

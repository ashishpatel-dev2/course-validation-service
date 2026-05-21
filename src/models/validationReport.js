import { DataTypes } from 'sequelize';

const validationReportModel = (sequelize) => {
  const ValidationReport = sequelize.define(
    'ValidationReport',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      course_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      locale: {
        type: DataTypes.STRING,
        allowNull: false
      },
      base_path: {
        type: DataTypes.STRING,
        allowNull: true
      },
      locale_path: {
        type: DataTypes.STRING,
        allowNull: true
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    },
    {
      tableName: 'validation_reports',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  ValidationReport.associate = (models) => {
    ValidationReport.hasMany(models.ValidationResult, {
      foreignKey: 'job_id',
      as: 'results'
    });
  };

  return ValidationReport;
};

export default validationReportModel;

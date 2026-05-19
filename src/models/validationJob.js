import { DataTypes } from 'sequelize';

const validationJobModel = (sequelize) => {
  const ValidationJob = sequelize.define(
    'ValidationJob',
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
      status: {
        type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED'),
        allowNull: false,
        defaultValue: 'PENDING'
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
      tableName: 'validation_jobs',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  ValidationJob.associate = (models) => {
    ValidationJob.hasMany(models.ValidationResult, {
      foreignKey: 'job_id',
      as: 'results'
    });
    ValidationJob.hasOne(models.ValidationSummary, {
      foreignKey: 'job_id',
      as: 'summary'
    });
  };

  return ValidationJob;
};

export default validationJobModel;

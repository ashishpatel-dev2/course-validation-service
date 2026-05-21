import { DataTypes } from 'sequelize';

const validationResultModel = (sequelize) => {
  const ValidationResult = sequelize.define(
    'ValidationResult',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      course_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      locale: {
        type: DataTypes.STRING,
        allowNull: false
      },
      severity_level: {
        type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low', 'Warning'),
        allowNull: false
      },
      object_path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      field_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      issue_description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      eng_value: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      localize_value: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: 'validation_results',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  ValidationResult.associate = (models) => {
    ValidationResult.belongsTo(models.ValidationJob, {
      foreignKey: 'job_id',
      as: 'job'
    });
  };

  return ValidationResult;
};

export default validationResultModel;

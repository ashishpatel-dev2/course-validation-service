import { DataTypes } from 'sequelize';

const validationSummaryModel = (sequelize) => {
  const ValidationSummary = sequelize.define(
    'ValidationSummary',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      total_fields_checked: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total_issues_found: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      translation_score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
      }
    },
    {
      tableName: 'validation_summary',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  ValidationSummary.associate = (models) => {
    ValidationSummary.belongsTo(models.ValidationJob, {
      foreignKey: 'job_id',
      as: 'job'
    });
  };

  return ValidationSummary;
};

export default validationSummaryModel;

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('validation_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'validation_jobs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      course_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false
      },
      severity_level: {
        type: Sequelize.ENUM('Critical', 'High', 'Medium', 'Low', 'Warning'),
        allowNull: false
      },
      object_path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      field_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      issue_description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('validation_results');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_validation_results_severity_level";'
    );
  }
};

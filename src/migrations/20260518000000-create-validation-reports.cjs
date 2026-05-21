'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('validation_reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false
      },
      base_path: {
        type: Sequelize.STRING,
        allowNull: true
      },
      locale_path: {
        type: Sequelize.STRING,
        allowNull: true
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('validation_reports');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_validation_reports_status";');
  }
};

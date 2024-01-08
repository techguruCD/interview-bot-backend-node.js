const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users', 
      'interviewerIndex',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'interviewerIndex')
  },
};

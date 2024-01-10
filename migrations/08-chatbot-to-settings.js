const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'settings', 
      'chatbotPrompt',
      {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      })
    await queryInterface.addColumn(
      'settings', 
      'chatbotFiles',
      {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
        defaultValue: []
      })
    await queryInterface.addColumn(
      'settings', 
      'chatbotIndex',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('settings', 'chatbotPrompt')
    await queryInterface.removeColumn('settings', 'chatbotFiles')
    await queryInterface.removeColumn('settings', 'chatbotIndex')
  },
};

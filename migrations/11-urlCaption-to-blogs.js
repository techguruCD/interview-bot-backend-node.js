const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'blogs',
      'urlCaption',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('blogs', 'urlCaption')
  },
};

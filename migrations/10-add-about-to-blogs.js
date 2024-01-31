const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'blogs',
      'type',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'blog'
      })
    await queryInterface.bulkInsert('blogs', [{
      id: '13dadf61-1426-4249-1613-2446fddb4de3',
      title: 'About',
      content: 'This is about content',
      type: 'about',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogs', {type: 'about'}, {})
    await queryInterface.removeColumn('blogs', 'type')
  },
};

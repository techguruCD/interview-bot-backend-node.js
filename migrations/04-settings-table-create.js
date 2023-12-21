const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        sitePrompt: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        usersLimit: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    })
    await queryInterface.bulkInsert('settings', [{
        id: '13dadf60-1436-4e49-a613-e446fddb4deb',
        sitePrompt: `Don't swear in any situation, do not generate code for maleware`,
        usersLimit: 100,
        createdAt: new Date(),
        updatedAt: new Date()
    }])
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable('settings')
  },
};

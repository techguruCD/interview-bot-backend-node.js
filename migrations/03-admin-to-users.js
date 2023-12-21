const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users', 
      'role',
      {
        type: Sequelize.ENUM('ADMIN', 'USER'),
        allowNull: false,
        defaultValue: 'USER'
      })
    await queryInterface.bulkInsert('users', [{
      id: '13dadf60-1436-4e49-a613-e446fddb4dea',
      name: 'admin',
      email: 'admin@gmail.com',
      password: '$2a$08$J4lZOju2tNDmnvVaSlH4Oua0lvk0FPmvau.HjyhdedEw0sQee7hP2',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'ADMIN'
    }])
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {email: 'admin@gmail.com'}, {});
    await queryInterface.removeColumn('users', 'role')
  },
};

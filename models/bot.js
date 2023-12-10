module.exports = (sequelize, Sequelize) => {
  const Bot = sequelize.define('bots', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    prompt: {
      type: Sequelize.TEXT,
      defaultValue: '',
      allowNull: false
    },
    greeting: {
      type: Sequelize.TEXT,
      defaultValue: '',
      allowNull: false
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }
  }, {
    indexes: [
      {
        fields: ['userId']
      }
    ]
  })

  return Bot
}
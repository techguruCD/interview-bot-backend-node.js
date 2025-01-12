module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    thirdPartyAuth: {
      type: Sequelize.ENUM,
      values: ['google', 'linkedin'],
      allowNull: true
    },
    role: {
      type: Sequelize.ENUM,
      values: ['ADMIN', 'USER'],
      allowNull: false,
      defaultValue: 'USER'
    },
    interviewerIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    indexes: [{
      unique: true,
      fields: ['email']
    }]
  });
  return User
}
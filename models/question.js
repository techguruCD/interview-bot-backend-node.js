module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("questions", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    question: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    answer: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    intervieweeId: {
      type: Sequelize.UUID,
      referenes: {
        model: 'users',
        key: 'id'
      },
      allowNull: false,
    },
    interviewerIndex: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['intervieweeId']
    }]
  });
  return Question
}
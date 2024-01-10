module.exports = (sequelize, Sequelize) => {
    const ChatBotQuestion = sequelize.define("chatbotquestions", {
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
      chatbotIndex: {
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
        fields: ['chatbotIndex']
      }]
    });
    return ChatBotQuestion
  }
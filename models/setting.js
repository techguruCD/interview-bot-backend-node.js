module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define('settings', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        sitePrompt: {
            type: Sequelize.TEXT,
            defaultValue: '',
            allowNull: false
        },
        usersLimit: {
            type: Sequelize.INTEGER,
            defaultValue: 100,
            allowNull: false
        },
        chatbotPrompt: {
            type: Sequelize.TEXT,
            defaultValue: '',
            allowNull: false
        },
        chatbotFiles: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            allowNull: false,
            defaultValue: []
        },
        chatbotIndex: {
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
        indexes: [
            {
                fields: ['userId']
            }
        ]
    })

    return Setting
}
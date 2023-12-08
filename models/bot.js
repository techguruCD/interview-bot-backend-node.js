module.exports = (sequelize, Sequelize) => {
    const Bot = sequelize.define('bots', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUID4,
            primaryKey: true
        },
        tone: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false
        },
        style: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false
        },
        prompt: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false
        },
        strenth_weakness: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false
        },
        about: {
            type: Sequelize.STRING,
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
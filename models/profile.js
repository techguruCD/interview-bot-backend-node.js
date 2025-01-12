module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define('profiles', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        about: {
            type: Sequelize.TEXT,
            defaultValue: '',
            allowNull: false
        },
        headline: {
            type: Sequelize.TEXT,
            defaultValue: '',
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false
        },
        linkedin: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
        website: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        },
        files: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            defaultValue: [],
            allowNull: false
        },
        prompt: {
            type: Sequelize.TEXT,
            defaultValue: ''
        },
        greeting: {
            type: Sequelize.TEXT,
            defaultValue: ''
        },
        chatId: {
            type: Sequelize.STRING,
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

    return Profile
}
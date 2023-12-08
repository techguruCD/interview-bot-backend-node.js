module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define('profiles', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        about: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false
        },
        headline: {
            type: Sequelize.STRING,
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
        file: {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
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
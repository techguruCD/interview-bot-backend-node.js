const dbConfig = require('../configs/db.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig[process.env.ENV]);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize)
db.profile = require('./profile.js')(sequelize, Sequelize)
db.bot = require('./bot.js')(sequelize, Sequelize)

db.profile.belongsTo(db.user, {foreignKey: 'userId', as: 'user'})
db.user.hasOne(db.profile, {foreignKey: 'userId', as: 'profile'})

db.bot.belongsTo(db.user, {foreignKey: 'userId', as: 'user'})
db.user.hasOne(db.bot, {foreignKey: 'userId', as: 'bot'})

module.exports = db;
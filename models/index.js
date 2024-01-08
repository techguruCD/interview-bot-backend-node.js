const dbConfig = require('../configs/db.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig[process.env.ENV]);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize)
db.profile = require('./profile.js')(sequelize, Sequelize)

db.profile.belongsTo(db.user, {foreignKey: 'userId', as: 'user'})
db.user.hasOne(db.profile, {foreignKey: 'userId', as: 'profile'})

db.blog = require('./blog.js')(sequelize, Sequelize)
db.setting = require('./setting.js')(sequelize, Sequelize)

db.question = require('./question.js')(sequelize, Sequelize)
db.question.belongsTo(db.user, {foreignKey: 'intervieweeId', as: 'user'})
db.user.hasMany(db.question, {foreignKey: 'intervieweeId', as: 'questions'})

module.exports = db;
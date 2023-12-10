const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "voices", deps: []
 * createTable "models", deps: [voices, users]
 * createTable "messages", deps: [users, models]
 * createTable "password_reset_tokens", deps: [users]
 * addIndex "users_email" to table "users"
 * addIndex "messages_user_id_model_id" to table "messages"
 * addIndex "messages_model_id" to table "messages"
 * addIndex "messages_user_id" to table "messages"
 * addIndex "models_user_id" to table "models"
 * addIndex "models_voice_id" to table "models"
 * addIndex "password_reset_tokens_user_id" to table "password_reset_tokens"
 *
 **/

const info = {
  "revision": 1,
  "name": "init",
  "created": "2023-11-26T00:02:00.581Z",
  "comment": ""
};

const migrationCommands = function (transaction) {
  return [{
    fn: "createTable",
    params: [
      "bots",
      {
        "id": {
          "type": Sequelize.UUID,
          "field": "id",
          "primaryKey": true,
          "defaultValue": Sequelize.UUIDV4
        },
        "prompt": {
          "type": Sequelize.TEXT,
          "field": "prompt",
          "defaultValue": ''
        },
        "greeting": {
          "type": Sequelize.TEXT,
          "field": "greeting",
          "defaultValue": ''
        },
        "userId": {
          "type": Sequelize.UUID,
          "onUpdate": "CASCADE",
          "onDelete": "CASCADE",
          "field": "userId",
          "references": {
            "model": "users",
            "key": "id"
          },
          "allowNull": false
        },
        "createdAt": {
          "type": Sequelize.DATE,
          "field": "createdAt",
          "allowNull": false,
          "defaultValue": Sequelize.NOW
        },
        "updatedAt": {
          "type": Sequelize.DATE,
          "field": "updatedAt",
          "allowNull": false
        }
      },
      {
        "transaction": transaction
      }
    ]
  },
  {
    fn: "addIndex",
    params: [
      "bots",
      ["userId"],
      {
        "indexName": "bots_user_id",
        "name": "bots_user_id",
        "transaction": transaction
      }
    ]
  }
  ];
};
const rollbackCommands = function (transaction) {
  return [{
    fn: "dropTable",
    params: ["bots", {
      transaction: transaction
    }]
  }
  ];
};

module.exports = {
  pos: 0,
  useTransaction: true,
  execute: function (queryInterface, Sequelize, _commands) {
    let index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise(function (resolve, reject) {
        function next() {
          if (index < commands.length) {
            let command = commands[index];
            console.log("[#" + index + "] execute: " + command.fn);
            index++;
            queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
          }
          else
            resolve();
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    } else {
      return run(null);
    }
  },
  up: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
  info: info
};

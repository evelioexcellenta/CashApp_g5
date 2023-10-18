const sequelize = require("sequelize")

const db = new sequelize("tescash1", "root", null, {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
})

module.exports = db

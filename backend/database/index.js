const mysql = require("mysql")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "pa55word",
    database: "tescash1",
    port: 3306,
    multipleStatements: true
})

db.connect((err) => {
    if (err) {
        return console.log(`error : ${err.message}`)
    }
    console.log(`connect to mysql server`)
})

module.exports = { db }
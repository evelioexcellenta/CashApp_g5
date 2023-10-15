const { db } = require('../database')
module.exports = {
    getData: (req, res) => {
        let scriptQuery = `Select * from categories`

        if (req.query && req.query.CategoryID) {
            scriptQuery = `Select * from categories where CategoryID = ${db.escape(req.query.CategoryID)};`
        }

        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },

    addData: (req, res) => {
        console.log(req.body)
        let { Category_Name } = req.body
        let insertQuery = `Insert into categories values (null,${db.escape(Category_Name)})`
//
        console.log(insertQuery)
        db.query(insertQuery, (err, results) => {
            if (err) res.status(500).send(err)

            db.query(`Select * from categories where Category_Name = ${db.escape(Category_Name)}`, (err2, results2) => {
                    res.status(200).send({
                        message: `penambahan category berhasil`,
                        data: results2
                    })
                })
                // res.status(200).send(results)
        })
    },
    deleteData: (req, res) => {
        let deleteQuery = `DELETE from categories where CategoryID = ${db.escape(req.params.CategoryID)}`

        db.query(deleteQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    }
}
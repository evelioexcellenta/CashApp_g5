const { db } = require('../database')
module.exports = {
    getData: (req, res) => {
        let scriptQuery = `SELECT products.*, categories.Category_Name FROM products LEFT JOIN categories ON products.CategoryID = categories.CategoryID`;
      
        if (req.query && req.query.ProductID) {
          scriptQuery += ` WHERE products.ProductID = ${db.escape(req.query.ProductID)}`;
        }
      
        db.query(scriptQuery, (err, results) => {
          if (err) res.status(500).send(err);
          res.status(200).send(results);
        });
      },
      


    addData: (req, res) => {
        console.log(req.body)
        let { Product_Name, Product_Image, Price, Description, CategoryID } = req.body
        let insertQuery = `Insert into products values (null,${db.escape(Product_Name)},${db.escape(Product_Image)},${db.escape(Price)},${db.escape(Description)},${db.escape(CategoryID)})`
        //
        console.log(insertQuery)
        db.query(insertQuery, (err, results) => {
            if (err) res.status(500).send(err)

            db.query(`Select * from products where Product_Name = ${db.escape(Product_Name)}`, (err2, results2) => {
                res.status(200).send({
                    message: `penambahan products berhasil`,
                    data: results2
                })
            })
            // res.status(200).send(results)
        })
    },
    editData: (req, res) => {
        let dataUpdate = []
        for (let prop in req.body) {
            dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
        }

        let updateQuery = `UPDATE products set ${dataUpdate} where ProductID = ${req.params.ProductID}`
        console.log(updateQuery)
        db.query(updateQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },
    deleteData: (req, res) => {
        let deleteQuery = `DELETE from products where ProductID = ${db.escape(req.params.ProductID)}`

        db.query(deleteQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    }
}
const db = require('../models')
const fs = require("fs");
const Product = db.Product;

module.exports = {
    getData: async(req, res) => {
        try {
            const products = await Product.findAll({
                attributes: {
                    exclude: ["is_admin"],
                },
            });

            return res.status(200).send({
                message: "Product List successfully created",
                data: products,
            });
        } catch (err) {
            return res.status(500).send({
                message: JSON.stringify(err),
                data: null,
            });
        }
    },
    addData: (req, res) => {;
        try {
            console.log(req.body)
            let { Product_Name, Price, Product_Image, Description, Category_ID } = req.body
            Product.create({ Product_Name, Price, Product_Image, Description, Category_ID })

            return res.status(200).json({
                message: "penambahan products berhasil",
                data: [],
            });
        } catch (err) {
            return res.status(500).send({
                message: JSON.stringify(err),
                data: null,
            });
        }
    },
    deleteData: async(req, res) => {
        try {
            const { Product_ID } = req.params;

            const productDelete = await Product.destroy({
                where: {
                    Product_ID: Product_ID,
                },
            });

            return res.status(200).send({
                message: "Product successfully delete",
                data: productDelete,
            });
        } catch (err) {
            return res.status(500).send({
                message: JSON.stringify(err.message),
                data: null,
            });
        }
    },

}
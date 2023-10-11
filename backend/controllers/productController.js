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
            let { Product_Name, Price, Description } = req.body
            Product.create({ Product_Name, Price, Description })

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
    editData: async(req, res) => {
        try {
            const { Product_Name, Price, Description } = req.body;
            const { id } = req.params;

            if (!Product_Name || !Price || !Description) {
                return res.status(400).json({
                    message: "Product_Name, Price, and Description are required",
                    data: null,
                });
            }

            const product = await Product.findOne({ where: { ProductID: id } });

            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                    data: null,
                });
            }

            product.Product_Name = Product_Name;
            product.Price = Price;
            product.Description = Description;

            await product.save();

            return res.status(200).json({
                message: "Product successfully updated",
                data: product,
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
            const { ProductID } = req.params;

            const productDelete = await Product.destroy({
                where: {
                    ProductID: ProductID,
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
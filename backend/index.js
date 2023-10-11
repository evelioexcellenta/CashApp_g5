const express = require('express')
const app = express()
const PORT = 3300;

app.use(express.json())
const db = require('./models')


try {
    db.sequelize.sync({ alter: true })
    console.log("database connected")
} catch (error) {
    console.log(error)
}


app.get('/', (req, res) => {
    res.status(200).send('<h4>Integrated mysql with express</h4>')
})

const { productRouter } = require("./routers");

app.use("/product", productRouter);


app.get('/products', (req, res) => {
    let scriptQuery = `Select * from products`
    db.query(scriptQuery, (err, results) => {
        if (err) res.status(500).send(err)
        res.status(200).send(results)
    })
})

app.listen(PORT, () => console.log('api running :', PORT));
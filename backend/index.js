const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3300;

app.use(cors())
app.use(express.json())
const db = require('./models')

try {
    db.sequelize.sync({ force: true })
    console.log("database connected")
} catch (error) {
    console.log(error)
}


app.get('/', (req, res) => {
    res.status(200).send('<h4>Integrated mysql with express</h4>')
})

const { productRouter } = require("./routers");
const { categoryRouter } = require("./routers");

// const { usersRouter } = require('./routers')
// const { cartsRouter } = require('./routers')

app.use("/product", productRouter);
app.use("/category", categoryRouter);
// app.use('/users', usersRouter)
// app.use('/carts', cartsRouter)


app.listen(PORT, () => console.log('api running :', PORT));








// app.get('/products', (req, res) => {
//     let scriptQuery = `Select * from products`
//     db.query(scriptQuery, (err, results) => {
//         if (err) res.status(500).send(err)
//         res.status(200).send(results)
//     })
// })
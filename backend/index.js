const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const userRouter = require("./routers/userRouter")
const db = require("./models")
const authRouter = require("./routers/authRouter")
dotenv.config()
const { verifyUser } = require("./middleware/authUser")

const corsOption = {
  origin: "http://127.0.0.1:5173",
  methods: "GET,POST,DELETE,PATCH",
  credentials: true,
}

app.use(cors(corsOption))

app.use(express.json())
app.use(userRouter)
app.use(authRouter)
app.use("/dashboard", verifyUser)

try {
  db.sequelize.sync({ alter: true })
  console.log("database connected")
} catch (error) {
  console.log(error)
}

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrated mysql with express</h4>")
})

const { productRouter } = require("./routers")

app.use("/product", productRouter)

app.listen(process.env.APP_PORT, () =>
  console.log("api running :", process.env.APP_PORT)
)

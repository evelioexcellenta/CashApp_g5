const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PWD,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

module.exports = transporter

const db = require("./../models")
const bcrypt = require("bcrypt")
const user = db.User
const jwt = require("jsonwebtoken")

const blacklist = new Set()

const authController = {
  login: async (req, res) => {
    const { Email, Password } = req.body
    const userLogin = await user.findOne({
      where: { Email },
    })

    if (!userLogin)
      return res.status(404).json({ msg: "User atau Password salah" })
    const match = await bcrypt.compare(Password, userLogin.Password)
    if (!match) return res.status(400).json({ msg: "User atau Password salah" })
    let payload = { id: userLogin.UserID, role: userLogin.Role }
    const token = jwt.sign(payload, "tokenaja", {
      expiresIn: "1h",
    })
    console.log(payload)
    req.token = token
    const userID = userLogin.UserID
    const fullname = userLogin.Fullname
    const email = userLogin.Email
    const role = userLogin.Role
    res.status(200).json({ userID, fullname, email, role, token })
  },

  logout: async (req, res) => {
    const token = req.headers.authorization

    blacklist.add(token)

    res.json({ msg: "Logout Berhasil" })
  },
}

module.exports = { authController }

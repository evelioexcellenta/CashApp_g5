const jwt = require("jsonwebtoken")
const db = require("./../models")
const user = db.User

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send("Access Denied")

  try {
    const token = authHeader.split(" ")[1]
    if (token === null || !token) {
      return res.status(401).send("Unauthorized request")
    }
    let verifiedUser = jwt.verify(token, "tokenaja")
    if (!verifiedUser) return res.status(401).send("Unauthorized request")
    req.user = verifiedUser
    next()
  } catch (error) {
    res.status(400).send("Invalid Token")
  }
}

const verifyAdmin = async (req, res, next) => {
  try {
    const userID = req.user.id
    console.log("UserID: ---------------------", userID)
    const userLogin = await user.findOne({
      where: {
        UserID: userID,
      },
    })
    if (!userLogin) return res.status(403).json({ msg: "User tidak ditemukan" })

    if (userLogin.Role !== "admin") {
      return res.status(403).json({ msg: "Akses dilarang" })
    }
    next()
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat memverifikasi data anda" })
  }
}

module.exports = { verifyUser, verifyAdmin }

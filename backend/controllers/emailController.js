const transporter = require("./../helpers/transporter")
const db = require("../models")
const user = db.User

const email = async (req, res) => {
  try {
    const userID = req.params.id
    const editLink = `http://127.0.0.1:5173/users/edit/${userID}` //

    const userToEdit = await user.findOne({
      where: { UserID: userID },
    })

    if (!userToEdit) {
      return res.status(404).json({ msg: "User tidak ditemukan !" })
    }

    await transporter.sendMail({
      from: "alexandergo505@gmail.com",
      to: "alexandergo190@gmail.com",
      subject: "Reset Email and Password Link",
      text: `This is your reset link: ${editLink}`,
    })

    res.send("Success")
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Internal Server Error" })
  }
}

module.exports = { email }

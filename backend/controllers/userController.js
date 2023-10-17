const db = require("./../models")
const bcrypt = require("bcrypt")
const user = db.User

const userController = {
  createUser: async (req, res) => {
    const { Fullname, Email, Password, ConfPassword, Role } = req.body
    if (Password !== ConfPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password harus sama !" })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(Password, salt)
    try {
      await user.create({
        Fullname: Fullname,
        Email: Email,
        Password: hashPassword,
        Role: Role,
      })
      res.status(201).json({ msg: "Register Berhasil" })
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  },

  getUser: async (req, res) => {
    try {
      const response = await user.findAll({
        attributes: ["UserID", "Fullname", "Email", "Role"],
      })
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },

  getUserById: async (req, res) => {
    try {
      const response = await user.findOne({
        where: {
          UserID: req.params.id,
        },
      })
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },
  updateUser: async (req, res) => {
    const userToUpdate = await user.findOne({
      where: {
        UserID: req.params.id,
      },
    })
    if (!userToUpdate)
      return res.status(404).json({ msg: "User tidak ditemukan" })
    const { Fullname, Email, Password, ConfPassword, Role } = req.body
    let hashPassword
    if (Password === "" || Password === null) {
      hashPassword = Password
    } else {
      const salt = await bcrypt.genSalt(10)
      hashPassword = await bcrypt.hash(Password, salt)
    }
    if (Password !== ConfPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password harus sama !" })
    try {
      await user.update(
        {
          Fullname: Fullname,
          Email: Email,
          Password: hashPassword,
          Role: Role,
        },
        {
          where: {
            UserID: req.params.id,
          },
        }
      )
      res.status(200).json({ msg: "Berhasil Mengubah Data" })
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  },
  deleteUser: async (req, res) => {
    const userToDelete = await user.findOne({
      where: {
        UserID: req.params.id,
      },
    })
    if (!userToDelete)
      return res.status(404).json({ msg: "User tidak ditemukan" })
    try {
      await user.destroy({
        where: {
          UserID: req.params.id,
        },
      })
      res.status(200).json({ msg: "User berhasil dihapus" })
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  },
}

module.exports = { userController }

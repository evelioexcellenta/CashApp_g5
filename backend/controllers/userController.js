const db = require("./../models")
const bcrypt = require("bcrypt")
const user = db.User
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./../assets"))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".gif") {
      return cb(new Error("Only images are allowed"))
    }
    cb(null, true)
  },
  limits: { fileSize: 1000000 },
}).single("profile")

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
  uploadProfileImage: async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message })
        }

        const userID = req.params.id
        console.log("/////////////////////", user.Email)
        const userToUpdate = await user.findOne({
          where: {
            UserID: userID,
          },
        })
        if (!userToUpdate)
          return res.status(404).json({ msg: "User tidak ditemukan" })

        userToUpdate.ProfileImage = req.file.filename
        await userToUpdate.save()
        return res.status(200).json({ msg: "Gambar profil berhasil diunggah" })
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ msg: error.message })
    }
  },
}

module.exports = { userController }

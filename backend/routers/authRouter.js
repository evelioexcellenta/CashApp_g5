const express = require("express")
const { authController } = require("./../controllers/authController")
// const { verifyUser } = require("./../middleware/authUser")
const { body, validationResult } = require("express-validator")
const router = express.Router()

router.post(
  "/login",
  [
    body("Email").notEmpty().isEmail(),
    body("Password").notEmpty().isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    authController.login(req, res)
  }
)

// router.post(
//   "/reset",
//   [body("Email").notEmpty().isEmail()],
//   async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }
//     const { Email } = req.body

//     res.status(200).json({ msg: "Reset link has been sent to your email" })
//   }
// )
// router.get("/me", verifyUser, authController.me)
router.delete("/logout", authController.logout)

module.exports = router

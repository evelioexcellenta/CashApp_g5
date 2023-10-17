const express = require("express")
const { authController } = require("./../controllers/authController")
const { verifyUser } = require("./../middleware/authUser")
const router = express.Router()

router.post("/login", authController.login)
// router.get("/me", verifyUser, authController.me)
router.delete("/logout", authController.logout)

module.exports = router

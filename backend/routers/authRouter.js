const express = require("express")
const { authController } = require("./../controllers/authController")
const router = express.Router()

router.post("/login", authController.login)
// router.get("/me", authController.me)
router.delete("/logout", authController.logout)

module.exports = router

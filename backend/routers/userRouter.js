const express = require("express")
const { userController } = require("./../controllers/userController")
const { email } = require("./../controllers/emailController")
const { verifyUser, verifyAdmin } = require("./../middleware/authUser")
const router = express.Router()

router.get("/users", verifyUser, verifyAdmin, userController.getUser)
// router.post("/users/add", verifyUser, verifyAdmin, userController.createUser)
router.get("/users/:id", verifyUser, userController.getUserById)
router.post("/users", verifyUser, verifyAdmin, userController.createUser)
router.patch("/users/:id", verifyUser, userController.updateUser)
router.post("/users/email/:id", verifyUser, email)
// router.post("/users/email/:id", email)
// router.post("/users/:id/upload", userController.uploadProfileImage)
router.delete("/users/:id", verifyUser, verifyAdmin, userController.deleteUser)

module.exports = router

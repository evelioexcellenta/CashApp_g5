const express = require("express")
const { userController } = require("./../controllers/userController")
const router = express.Router()
const { verifyUser, verifyAdmin } = require("./../middleware/authUser")

router.get("/users", verifyUser, verifyAdmin, userController.getUser)
// router.post("/users/add", verifyUser, verifyAdmin, userController.createUser)
router.get("/users/:id", verifyUser, verifyAdmin, userController.getUserById)
router.post("/users", verifyUser, verifyAdmin, userController.createUser)
router.patch("/users/:id", verifyUser, verifyAdmin, userController.updateUser)
router.delete("/users/:id", verifyUser, verifyAdmin, userController.deleteUser)

module.exports = router

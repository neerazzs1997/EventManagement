const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
// const productController = require("../controller/productController")
// const cartController = require('../controller/cartController')
// const orderController = require("../controller/orderController")
const auth = require("../middleware/middleware")



router.get('test-me', function(req,res){
    res.send("hello from get api")
})


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get("/logout",auth.authentication,userController.userLogout)
router.put("/newPassword/:userId",auth.authorization,userController.updatePassword)
router.get("/resetPasswrod/:userId",auth.authentication,userController.getPassword)



router.get("*", async function(req,res){
    return res.status(404).send({status:false, message:"page not found"})
})



module.exports = router
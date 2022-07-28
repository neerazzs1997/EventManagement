const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const eventController = require("../controllers/eventController")
const auth = require("../middleware/middleware")



router.get('test-me', function(req,res){
    res.send("hello from get api")
})


router.post('/register', userController.registerUser)                                       // // createuser 

router.post('/login', userController.loginUser)                                             // // loginUser
                   
router.get("/logout",auth.authentication,userController.userLogout)                         // // logout user

router.put("/newPassword/:userId",auth.authentication,userController.updatePassword)         // // update the password

router.get("/resetPasswrod/:userId",auth.authentication,userController.getPassword)         // // reset password


router.post('/events', eventController.eventController)                                     // // create events

router.get('/events/:userId',auth.authentication, eventController.eventController)            // // get userid with events

router.get('/eventsByQuery',auth.authentication,eventController.eventController)              // // get events with query params

router.put('/events/:eventId',auth.authentication, eventController.eventController)           // // update events with event id 

router.put('/events/:eventId',auth.authentication, eventController.eventController)           // // get all the events


router.get("*", async function(req,res){
    return res.status(404).send({status:false, message:"page not found"})
})



module.exports = router
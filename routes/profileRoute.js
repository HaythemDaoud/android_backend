const express = require('express')
const router = express.Router()


const {
  resetPassword,
  editUser,
} = require('../controllers/profilecontroller')

//const { protect } = require('../middleware/authMiddleware')


router.post('/resetPwd', resetPassword)
router.post('/editus', editUser)




module.exports = router

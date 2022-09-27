const express = require('express')

const { controllerWrapper } = require('../../helpers')
const { auth } = require('../../middlewares')
const { logout, googleAuth, googleRedirect } = require('../../controllers/auth')

const router = express.Router()

router.post('/logout', auth, controllerWrapper(logout))
router.get("/google", controllerWrapper(googleAuth));
router.get("/google-redirect", controllerWrapper(googleRedirect));

module.exports = router

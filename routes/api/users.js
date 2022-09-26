const express = require('express')

const { ctrlWrapper } = require('../../helpers')
const { auth } = require('../../middlewares')
const { logout, googleAuth, googleRedirect } = require('../../controllers/auth')

const router = express.Router()

router.post('/logout', auth, ctrlWrapper(logout))
router.get("/google", ctrlWrapper(googleAuth));
router.get("/google-redirect", ctrlWrapper(googleRedirect));

module.exports = router

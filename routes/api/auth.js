const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/auth')

const { ctrlWrapper } = require('../../helpers')

const { validateBody } = require('../../middlewares')

const { schemas } = require('../../models/user')

const { logout, googleAuth, googleRedirect } = require('../../controllers/auth')

const { authenticateUser } = require('../../middlewares')
const {
  verificationTokenCheck,
  emailConfirmation,
} = require('../../controllers/users')

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
)

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
)

router.get('/logout', authenticateUser, ctrlWrapper(logout))

router.get('/google', ctrlWrapper(googleAuth))

router.get('/google-redirect', ctrlWrapper(googleRedirect))

router
  .get('/verify/:token', verificationTokenCheck)
  .post('/verify', emailConfirmation)

module.exports = router

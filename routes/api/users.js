const express = require('express')

const { ctrlWrapper } = require('../../helpers')
const {
  auth,
  validateBody,
  authenticateUser,
  validateRequestId,
} = require('../../middlewares')
const { logout, googleAuth, googleRedirect } = require('../../controllers/auth')
const { addResults } = require('../../controllers/users')
const { addResultSchema } = require('../../models')

const router = express.Router()

router.post('/logout', auth, ctrlWrapper(logout))
router.get('/google', ctrlWrapper(googleAuth))
router.get('/google-redirect', ctrlWrapper(googleRedirect))

router.patch(
  '/:id/results',
  authenticateUser,
  validateRequestId,
  validateBody(addResultSchema),
  ctrlWrapper(addResults)
)

module.exports = router

const express = require('express')

const { ctrlWrapper } = require('../../helpers')
const {
  validateBody,
  authenticateUser,
  validateRequestId,
} = require('../../middlewares')
const {
  addResults,
  getCurrentUserInfo,
  resetUserProgress,
} = require('../../controllers/users')
const { addResultSchema } = require('../../models')

const router = express.Router()

router.get('/current', authenticateUser, ctrlWrapper(getCurrentUserInfo))

router.patch(
  '/:id/results',
  authenticateUser,
  validateRequestId,
  validateBody(addResultSchema),
  ctrlWrapper(addResults)
)

router.delete(
  '/:id/progress',
  authenticateUser,
  validateRequestId,
  ctrlWrapper(resetUserProgress)
)

module.exports = router

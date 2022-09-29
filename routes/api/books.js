const express = require('express')
const controller = require('../../controllers/books')
const { updateResume } = require('../../controllers/books')
const {
  auth,
  authenticateUser,
  validateBody,
  validateRequestId,
  checkCorrectBookStatus,
} = require('../../middlewares')
const { schemas, updateResumeSchema } = require('../../models')
const { ctrlWrapper } = require('../../helpers')

const router = express.Router()

router.post(
  '/add',
  auth,
  validateBody(schemas.addBooksSkhema),
  ctrlWrapper(controller.add)
)

router.patch(
  '/:id/resume',
  authenticateUser,
  validateRequestId,
  checkCorrectBookStatus,
  validateBody(updateResumeSchema),
  ctrlWrapper(updateResume)
)

module.exports = router

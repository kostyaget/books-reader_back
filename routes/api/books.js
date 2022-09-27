const express = require('express')
const controller = require('../../controllers/books')
const { updateResume } = require('../../controllers/books')
const { validateBody } = require('../../middlewares')
const { ctrlWrapper } = require('../../helpers')
const { updateResumeSchema } = require('../../models')

const router = express.Router()

router.post('/', ctrlWrapper(controller.add))
router.patch(
  '/:bookId/resume',
  validateBody(updateResumeSchema),
  ctrlWrapper(updateResume)
)

module.exports = router

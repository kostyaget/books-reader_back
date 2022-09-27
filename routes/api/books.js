const express = require('express')
const controller = require('../../controllers/books')
const { validateBody, auth } = require('../../middlewares')
const { schemas } = require('../../models')

const { ctrlWrapper } = require('../../helpers')
const router = express.Router()

router.post(
  '/',
  auth,
  validateBody(schemas.addBooksSkhema),
  ctrlWrapper(controller.add)
)

module.exports = router

const express = require('express')
const controller = require('../../controllers/books')

const { ctrlWrapper } = require('../../helpers')
const router = express.Router()

router.post('/', ctrlWrapper(controller.add))

module.exports = router

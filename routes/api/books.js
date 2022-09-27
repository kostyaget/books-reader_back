const express = require('express')
const controller = require('../../controllers/books')
const { updateResume } = require('../../controllers/books')

const { ctrlWrapper } = require('../../helpers')
const router = express.Router()

router.post('/', ctrlWrapper(controller.add))
router.patch('/:bookId/resume', ctrlWrapper(updateResume))

module.exports = router

const express = require('express')
const { ctrlWrapper } = require('../../helpers')
const { authenticateUser } = require('../../middlewares')
const router = express.Router()

router.get('/', authenticateUser, ctrlWrapper())

router.patch('/:id/status')

module.exports = router

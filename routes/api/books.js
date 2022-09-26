const express = require('express')
const controller = require('../../controllers/books')
/* const { validationBody } = require('../../middlewares/validationBody') */
const { controllerWrapper } = require('../../helpers')
const router = express.Router()

router.post('/', controllerWrapper(controller.add))

module.exports = router

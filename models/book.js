const { Schema, model } = require('mongoose')

const { handleSchemaValidationErrors } = require('../helpers')

const bookSchema = new Schema({}, { versionKey: false, timestamps: true })

bookSchema.post('save', handleSchemaValidationErrors)

const Book = model('book', bookSchema)

module.exports = {
  Book,
}

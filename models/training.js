const { Schema, model } = require('mongoose')

const { handleSchemaValidationErrors } = require('../helpers')

const trainingSchema = new Schema({}, { versionKey: false, timestamps: true })

trainingSchema.post('save', handleSchemaValidationErrors)

const Training = model('book', trainingSchema)

module.exports = {
  Training,
}

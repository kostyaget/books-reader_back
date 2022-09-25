const { Schema, model } = require('mongoose')

const { handleSchemaValidationErrors } = require('../helpers')

const trainingSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    finishDate: {
      type: Date,
      required: [true, 'Finish date is required'],
    },
    pageAmount: {
      type: Number,
      min: [1, 'Minimum amount of pages must be 1'],
      max: [1000, 'Minimum amount of pages must be 1000'],
      required: [true, 'Pages amount is required'],
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: [true, 'Book id is required'],
    },
    reader: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Reader person is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

trainingSchema.post('save', handleSchemaValidationErrors)

const Training = model('training', trainingSchema)

module.exports = {
  Training,
}

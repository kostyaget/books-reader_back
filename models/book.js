const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleSchemaValidationErrors } = require('../helpers')

const bookSchema = new Schema(
  {
    title: {
      type: String,
      minLenght: [1, 'Must be minimum 1 symbols. You got {VALUE}'],
      maxLenght: [100, 'Must be maximum 100 symbols. You got {VALUE}'],
      trim: true,
      required: [true, 'Book title is required'],
    },
    author: {
      type: String,
      minLenght: [1, 'Must be minimum 1 symbols. You got {VALUE}'],
      maxLenght: [30, 'Must be maximum 30 symbols. You got {VALUE}'],
      trim: true,
      required: [true, 'Author is required'],
    },
    publishingDate: {
      type: Date,
      required: [true, 'Publishig date is required'],
    },
    pageAmount: {
      type: Number,
      min: [1, 'Minimum amount of pages must be 1'],
      max: [5000, 'Minimum amount of pages must be 5000'],
      required: [true, 'Pages amount is required'],
    },
    status: {
      type: String,
      lowercase: true,
      trim: true,
      enum: {
        values: ['completed', 'in-progress', 'next'],
        message: '{VALUE} is not supported',
      },
      default: 'next',
    },
    rating: {
      type: Number,
      min: [0, 'Minimum amount of pages must be 0'],
      max: [5, 'Minimum amount of pages must be 5'],
      default: 0,
      required: [true, 'Rating value is required'],
    },
    summary: {
      type: String,
      minLenght: [1, 'Must be minimum 1 symbols. You got {VALUE}'],
      maxLenght: [1000, 'Must be maximum 1000 symbols. You got {VALUE}'],
      trim: true,
      required: [true, 'Summary is required'],
    },
    /*  reader: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Reader person is required'],
    }, */
  },
  { versionKey: false, timestamps: true }
)

bookSchema.post('save', handleSchemaValidationErrors)

const Book = model('book', bookSchema)

const updateResumeSchema = Joi.object({
  rating: Joi.number().integer().min(0).max(5),
  summary: Joi.string().min(1).max(100),
}).with('rating', 'summary')

module.exports = {
  Book,
  updateResumeSchema,
}

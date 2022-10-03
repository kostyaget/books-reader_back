const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { randomUUID } = require('crypto')

const { handleSchemaValidationErrors, patterns } = require('../helpers')

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: [3, 'Must be at least 3, got {VALUE}'],
      maxLength: [30, 'Must be maximum 30 symbols. You got {VALUE}'],
      trim: true,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: patterns.email,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, 'Must be at least 6, got {VALUE}'],
      maxLength: [1000, 'Must be maximum 1000 symbols. You got {VALUE}'],
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: '',
    },
    firstVisit: {
      type: Boolean,
      default: true,
    },
    progress: [
      {
        trainingDate: {
          type: Date,
          required: [true, 'Date is required'],
        },
        pagesAmount: {
          type: Number,
          min: [1, 'Minimum amount of pages must be 1'],
          max: [1000, 'Minimum amount of pages must be 1000'],
          required: [true, 'Pages amount is required'],
        },
      },
    ],
    token: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'verificationToken is required'],
      default: randomUUID(),
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.post('save', handleSchemaValidationErrors)

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(patterns.email).required(),
  password: Joi.string().min(6).max(40).required(),
  // confirmPasswordHash: Joi.string().required().valid(Joi.ref('passwordHash')),
  repeat_password: Joi.string().required().valid(Joi.ref('password')),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(patterns.email).required(),
  password: Joi.string().min(6).max(40).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
}

const addResultSchema = Joi.object({
  trainingDate: Joi.date().required(),
  pagesAmount: Joi.number().integer().min(1).required(),
})

const emailVerificationSchema = Joi.object({
  email: Joi.string().pattern(patterns.email).required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  schemas,
  addResultSchema,
  emailVerificationSchema,
}

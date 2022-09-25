const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const { handleSchemaValidationErrors, patterns } = require('../helpers')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: patterns.email,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    firstVisit: {
      type: Boolean,
      default: true,
    },
    progress: [],
  },
  { versionKey: false, timestamps: true }
)

userSchema.post('save', handleSchemaValidationErrors)

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash)
}

const User = model('user', userSchema)

module.exports = {
  User,
}

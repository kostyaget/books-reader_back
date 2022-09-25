const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const { handleSchemaValidationErrors } = require('../helpers')

const patterns = {
  // eslint-disable-next-line no-useless-escape
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
}

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

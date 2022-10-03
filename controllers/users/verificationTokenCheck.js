const { User } = require('../../models')
const { RequestError } = require('../../helpers')

const verificationTokenCheck = async (req, res, next) => {
  try {
    const { token: verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    if (!user) throw RequestError(404, 'User not Found')

    await User.findByIdAndUpdate(user._id, {
      verified: true,
      verificationToken: '',
    })

    res.status(200).json({
      message: 'Verification successful',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { verificationTokenCheck }

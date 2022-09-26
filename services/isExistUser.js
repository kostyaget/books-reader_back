const User = require("../../models/User");

const isExistUser = async (email) => {
  const existUser = await User.findOne({ email });

  return existUser;
};

module.exports = isExistUser;

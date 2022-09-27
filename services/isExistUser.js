const {User} = require("../models");

const isExistUser = async (email) => {
  const existUser = await User.findOne({ email });

  return existUser;
};

module.exports = isExistUser;

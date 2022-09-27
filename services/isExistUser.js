const {User} = require("../models");

const isExistUser = async (email) => {
  const existUser = await User.findOne({ email });
console.log("existUser==", existUser)
  return existUser;
};

module.exports = isExistUser;

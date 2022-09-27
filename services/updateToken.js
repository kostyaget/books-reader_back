const {User} = require("../models");

const updateToken = async (id, token) => {
  return await User.findOneAndUpdate(id, token);
};

module.exports = updateToken;

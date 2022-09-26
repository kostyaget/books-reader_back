const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const createUser = async (body) => {
  const newUser = await User.create(body);
  const { id, email, verificationToken } = newUser;

  const token = jwt.sign({ id: newUser.id }, TOKEN_SECRET_KEY, {
    expiresIn: "20h",
  });

  newUser.token = token;
  await newUser.save();

  return { id, email, token, verificationToken };
};

module.exports = createUser;
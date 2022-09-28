
const register = require('./register');
const login = require('./login');
const { googleAuth, googleRedirect } = require("./googleLogin");

module.exports = {
    register,
    login,
    googleAuth,
    googleRedirect,
}


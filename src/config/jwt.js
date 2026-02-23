const envConfig = require("./env");

module.exports = {
    secret: envConfig.JWT_SECRET,
    expiresIn: envConfig.JWT_EXPIRES_IN
};
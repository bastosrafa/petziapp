const { onHotmartWebhook } = require("./onHotmartWebhook");
const { changePassword } = require("./changePassword");
require("dotenv").config();


module.exports = {
  onHotmartWebhook,
  changePassword,
};

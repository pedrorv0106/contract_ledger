const crypto = require('crypto');

module.exports = (password, salt, iteration = 5) => {
  let c = crypto.createHmac('sha1', salt.toString());

  for (let i=0; i < iteration; i++) {
    c = c.update(password.toString());
  }
  return c.digest('hex');
};

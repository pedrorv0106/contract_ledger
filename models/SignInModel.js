const db = require('../database');
const generateResponseObject = require('../lib/generateResponseObject');
const createHash = require('../lib/hash');
const validate = require('../lib/validator');
const configs = require('../configs');
require('../schemas/users');

class SignUpModel {
  constructor() {
    this.Users = db.model('users');
  }

  async signIn(userData){
    if(!validate(userData).success){
      return generateResponseObject(false, validate(userData).message, null);
    }

    try {
      let user = await this.Users.findOne({email: userData.email});
      let password = createHash(userData.password, configs.PASSWORD_SALT);
      if(!user || user.password !== password){
        return generateResponseObject(false, 'Email or password is incorrect', null);
      }
      return generateResponseObject(true, null, { id: user._id, email : user.email });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new SignUpModel();

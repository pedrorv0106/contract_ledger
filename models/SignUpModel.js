const db = require('../database/index');
const generateResponseObject = require('../lib/generateResponseObject');
const createHash = require('../lib/hash');
const validate = require('../lib/validator');
const configs = require('../configs');
require('../schemas/users');

class SignUpModel {
  constructor() {
    this.Users = db.model('users');
  }

  async signUp(userData){
    if(!validate(userData).success){
      return generateResponseObject(false, validate(userData).message, null);
    }

    try {
      let ifExistsUser = await this.Users.findOne({email: userData.email});
      if(ifExistsUser){
        return generateResponseObject(false, 'Email already exist!', null);
      }

      let user = await this.Users.create({
        email: userData.email,
        password: createHash(userData.password, configs.PASSWORD_SALT)
      });
      return generateResponseObject(true, null, { id: user._id, email : user.email });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new SignUpModel();

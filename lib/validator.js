const validator = require('validator');

function generateErrorObject(message){
  return {
    success: false,
    message: message
  };
}

module.exports = (data) => {
  if(data.email && validator.isEmpty(data.email)){
    return generateErrorObject('Email is required');
  }
  if(data.username && validator.isEmpty(data.username)){
    return generateErrorObject('Username is required');
  }
  if(data.password && validator.isEmpty(data.password)){
    return generateErrorObject('Password is required');
  }
  if(data.email && !validator.isLength(data.email, {min: 10, max: 255})){
    return generateErrorObject('Email length must be min 10 and max 255 characters');
  }
  if(data.username && !validator.isLength(data.username, {min: 6, max: 30})){
    return generateErrorObject('Username length must be min 6 and max 30 characters');
  }
  if(data.password && !validator.isLength(data.password, {min: 6, max: 60})){
    return generateErrorObject('Password length must be min 6 and max 60 characters');
  }
  if(data.email && !validator.isEmail(data.email)){
    return generateErrorObject('Please type valid email');
  }
  if(data.username && !validator.isAscii(data.username)){
    return generateErrorObject('Username is incorrect');
  }
  if(data.confirm_password && data.confirm_password !== data.password){
    return generateErrorObject('Please repeat password again');
  }
  return {
    success: true
  };
}

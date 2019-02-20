function isEmail(email){
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isLength(value, min, max){
  return value.length >= min && value.length <= max ? true : false;
}

function generateValidationResponse(success, message){
  return { success, message }
}

function validate(data){
  if(!data.email || !isEmail(data.email)){
    return generateValidationResponse(false, "Please enter valid email!");
  }
  if(!data.password || !isLength(data.password, 6, 20)){
    return generateValidationResponse(false, "Password length must be 6-20 character!");
  }
  if(data.confirm_password && data.password !== data.confirm_password){
    return generateValidationResponse(false, "Please enter equal password for confirm!");
  }
  return generateValidationResponse(true, null);
}

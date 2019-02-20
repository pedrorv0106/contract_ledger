function changeStyle(type, message){
  $("#error")
    .text(message)
    .css({"display": "block", "background": type === 'error' ? "FIREBRICK" : "green"});
}

function callbackSignIn(err, data){
  if(err) changeStyle('error', err);
  else if(!data.success) changeStyle('error', data.error);
  else {
    localStorage.setItem('userId', data.data.id);
    window.location.href='/dashboard';
  }
}

function callbackSignUp(err, data){
  if(err) changeStyle('error', err);
  else if(!data.success) changeStyle('error', data.error);
  else {
    changeStyle("success", "Your account created successfully! Please go to \'Sign In\' page for sign in your account.");
    $('#email').val("");
    $('#password').val("");
    $('#confirm_password').val("");
    setTimeout(function(){
      window.location.href='/signin';
    }, 10000);
  }
}

function signUp(){
  let user = {
    email: $('#email').val(),
    password: $('#password').val(),
    confirm_password: $('#confirm_password').val()
  };

  if(!validate(user).success) changeStyle('error', validate(user).message);
  else POST('/signup', user, callbackSignUp);
}

function signIn(){
  let user = {
    email: $('#email').val(),
    password: $('#password').val()
  };

  if(!validate(user).success) changeStyle('error', validate(user).message);
  else POST('/signin', user, callbackSignIn);
}

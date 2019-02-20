const DOMAIN = 'https://m-ledger.herokuapp.com';

function GET(url){
  $.ajax({
      url: DOMAIN + url,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
      }
  });
}

function POST(url, data, cb){
  $.ajax({
      url: DOMAIN + url,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data){
        cb(null, data);
      },
      error: function(error){
        cb(error, null);
      }
  });
}

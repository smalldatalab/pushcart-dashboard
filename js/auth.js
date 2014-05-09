window.Pushcart = {};
Pushcart.accessToken = "";

function getAccessToken( clientId, clientSecret ) {
  $.ajax({
    type: 'POST',
    url:  'http://gopushcart.com/api/v1/oauth/token',
    xhrFields: { withCredentials: true},
    data: {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret
    },
    error: function() {
      alert("wrong username and/or password");
    },
    success: function(data){
      Pushcart.accessToken = data.access_token;
      console.log(data.access_token);
      sessionStorage.setItem("accessToken", data.access_token);
    }
  });
}

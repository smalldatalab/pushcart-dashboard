Pushcart.Views.Login = Backbone.View.extend({
  
  initialize: function() {
    _.bindAll(this, 'render', 'loginPress')
    this.login = $('#login-template').html();
  },
  
  events: {
    'click #login_button':  'loginPress'
  },
  
  render: function() {
    $(this.el).html(this.login);
    return this;
  },
  
  loginPress: function(event) {
    event.preventDefault();
    var $dialog = $('.login-container');
    var username = $dialog.find('input[name="username"]').val();
    var password = $dialog.find('input[name="password"]').val();
    this.getAccessToken(username, password);
  },

  getAccessToken: function(clientId, clientSecret) {
    $.ajax({
      type: 'POST',
      url:  'http://gopushcart.com/api/v1/oauth/token',
      xhrFields: { withCredentials: true},
      data: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      },
      
      error: function() {
        alert('wrong username and/or password');
      },
      
      success: function(data){
        Pushcart.accessToken = data.access_token;
        sessionStorage.setItem('accessToken', data.access_token);
        
        Pushcart.app.navigate("admin", {trigger: true})
      }
    });
  }
  
});
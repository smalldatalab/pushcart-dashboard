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
    getAccessToken(username, password);
  }
  
})
Pushcart.Views.Login = Backbone.View.extend({
  
  initialize: function() {
    _.bindAll(this, 'render', 'login_press')
    this.login = $('#login-template').html();
  },
  
  events: {
    'click #login_button':  'login_press'
  },
  
  render: function() {
    $(this.el).html(this.login);
    return this;
  },
  
  login_press: function(event) {
    event.preventDefault();
    var $dialog = $('.login-container');
     var username = $dialog.find('input[name="username"]').val();
    var password = $dialog.find('input[name="password"]').val();
    getAccessToken(username, password);
  }
  
})
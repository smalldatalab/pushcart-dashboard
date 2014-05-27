Pushcart.Views.UserInfo = Backbone.View.extend({
  
  tagName: 'tr', 
  className: 'user-data',

  initialize: function(){
    this.usersInfoTemplate = $('#usersInfoTemplate').html();
  },

  render: function(){
    $(this.el).html(this.usersInfoTemplate);
    return this;
  }
});
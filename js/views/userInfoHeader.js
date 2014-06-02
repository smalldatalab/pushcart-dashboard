Pushcart.Views.UsersInfoHeader = Backbone.View.extend({
  
  el:'.user-info-categories',
  
  initialize: function(){
    this.usersInfoHeaderTemplate = $('#usersInfoHeaderTemplate').html();
  },

  render: function(){
    $(this.el).html(this.usersInfoHeaderTemplate);
    return this;
  }

});
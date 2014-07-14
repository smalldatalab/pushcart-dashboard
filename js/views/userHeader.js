Pushcart.Views.UsersTableHeader = Backbone.View.extend({
  
  tagName: 'table',
  
  initialize: function(){
    this.headerTemplate = $('#usersHeaderTemplate').html();
  },

  render: function(){
    $(this.el).html(this.headerTemplate);
    return this;
  }

});
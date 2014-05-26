Pushcart.Views.UsersTableHeader = Backbone.View.extend({
  
  tagName: 'table',
  className: 'user-table',
  
  initialize: function(){
    // _.bindAll(this, 'render')
    this.headerTemplate = $('#usersHeaderTemplate').html();
  },

  render: function(){
    $(this.el).html(this.headerTemplate);
    return this;
  }

});
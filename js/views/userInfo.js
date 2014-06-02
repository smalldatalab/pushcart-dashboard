  Pushcart.Views.UserInfo = Backbone.View.extend({
   
  tagName: 'table', 
  className: 'user-info-table',
  template:  _.template($('#usersInfoTemplate').html()),
  
  render: function() {
    this.$el.html(this.template({ user: this.model.toJSON() }));
    return this;
  }
});
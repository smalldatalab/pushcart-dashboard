  Pushcart.Views.UserInfo = Backbone.View.extend({
   
  tagName: 'table', 
  className: 'user-info-table',
  template:  _.template($('#usersInfoTemplate').html()),
  
  render: function() {
    console.log(this.model.toJSON());
    this.$el.html(this.template({ user: this.model.toJSON() }));
    console.log(this.$el);
    return this;
  }
});
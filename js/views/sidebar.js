Pushcart.Views.Sidebar = Backbone.View.extend({

  el: '.sidebar',
  
  initialize: function(){
    this.sideBarTemplate = $('#sideBarTemplate').html();
  },

  render: function(){
    $(this.el).html(this.sideBarTemplate);
    return this;
  }

});
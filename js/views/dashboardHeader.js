Pushcart.Views.DashboardHeader = Backbone.View.extend({

  el: '.content-header',
  
  initialize: function(){
    this.adminTemplate = $('#adminHeaderTemplate').html();
  },

  render: function(){
    $(this.el).html(this.adminTemplate);
    return this;
  }

});
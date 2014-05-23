Pushcart.Views.PurchasesTableHeader = Backbone.View.extend({

  el: '.collapse-custom',
  
  initialize: function(){
    this.purchasesViewHeaderTemplate = $('#purchasesViewHeaderTemplate').html();
  },

  render: function(){
    $(this.el).html(this.purchasesViewHeaderTemplate);
    return this;
  }

});
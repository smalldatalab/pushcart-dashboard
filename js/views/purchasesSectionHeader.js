Pushcart.Views.PurchasesSectionHeader = Backbone.View.extend({

  el: '.bar-charts',

  initialize: function(){
    this.purchasesSectionTemplate = $('#purchasesSectionHeaderTemplate').html();
  },

  render: function(){
    $(this.el).html(this.purchasesSectionTemplate);
    return this;
  }

});
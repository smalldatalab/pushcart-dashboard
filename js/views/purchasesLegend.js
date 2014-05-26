Pushcart.Views.PurchasesLegend = Backbone.View.extend({

  el: '.purchases-legend',

  initialize: function(){
    this.purchasesLegendTemplate = $('#purchasesLegendTemplate').html();
  },

  render: function(){
    $(this.el).html(this.purchasesLegendTemplate);
    return this;
  }

});
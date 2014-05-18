Pushcart.Views.PurchaseItemDetail = Backbone.View.extend({
  
  template: _.template($('#template-purchase-item-details').html()),
  
  initialize: function() {
    this.chartView = new Pushcart.Views.NutritionCharts({
      model: this.model,
    });
  }
  
});
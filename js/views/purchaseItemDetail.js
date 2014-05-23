Pushcart.Views.PurchaseItemDetail = Backbone.View.extend({
  
  template: _.template($('#purchaseItemDetailsTemplate').html()),
  
  initialize: function() {
    this.chartView = new Pushcart.Views.NutritionCharts({
      model: this.model,
    });
  }
  
});
// nutritional info for individual purchased items - renders doughnut charts 
var PurchaseItemDetailView = Backbone.View.extend({

  template: _.template($('#template-purchase-item-details').html()),

  initialize: function() {
    this.chartView = new NutritionChartsView({
      model: this.model,
      size: 100
    });
  },

  remove: function() {
   this.chartView.remove();
   Backbone.View.prototype.remove.call(this);
  },

  render: function() {
    this.$el.html(this.template());
    
    if (this.model) {
      this.chartView.model = this.model;

      this.$('.charts').append(this.chartView.render().el);
    };
    
    return this;
  }
});
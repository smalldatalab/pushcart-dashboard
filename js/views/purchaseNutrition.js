var NutritionView = Backbone.View.extend({
  template: _.template($('#template-nutrition-aggregate').html()),

  initialize: function(options){

    this.options = options;

    this.collection = new PurchaseItemsCollection([], {
      purchase: this.model
    });
    this.listenTo(this.collection, 'sync', this.itemsFetched);
    this.collection.fetch();
  },


  render: function() {
    // var data = {};
    
    this.$el.html('Aggregates');
    return this;
  }

});
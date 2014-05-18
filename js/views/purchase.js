Pushcart.Views.Purchase = Backbone.View.extend({
  
  template: _.template($('#purchase-view-template').html()),
  className: 'purchase-view',
 
  initialize: function(options) {
    this.options = options;
    this.userId = options.userId;
  },

  render: function() {
    var self = this; 

    var data = _.extend({}, this.model.toJSON(), {
      row_number: this.options.rowNumber, 
      formatted_purchase_date: Pushcart.DateFormatter.format(this.model.get('purchase_date'))
    }); 

    this.$el.html(this.template(data)); 
    
    var purchaseItemsColl = new Pushcart.Collections.PurchaseItems({
      userId: this.userId,
      purchase: this.model
    });

    purchaseItemsColl.fetch().done(function() {
      self.itemsView = new Pushcart.Views.PurchaseItems({
        el: self.$('.items-panel'),
        collection: purchaseItemsColl
      }).render();  
    });
    return this;
  }
  
});
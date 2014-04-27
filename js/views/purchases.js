
var PurchaseView = (function() {
  
  return Backbone.View.extend({
 
  template: _.template($('#template-purchase-row').html()),
 
  initialize: function(options) {
    this.options = options;
  },

  render: function() {
    var self = this; 

    var data = _.extend({}, this.model.attributes, {
      row_number: this.options.rowNumber, 
      formatted_purchase_date: PushCart.DateFormatter.format(this.model.get('purchase_date'))
    }); 

    this.$el.html(this.template(data)); 
                                       
    this.itemsView = new PurchaseItemsView({
      el: this.$('.items-panel'),
      model: this.model
    }).render();


    this.itemDetailView = new PurchaseItemDetailView({
      el: this.$('.item-details-panel')
    }).render();

    return this;
  },

  });

})();



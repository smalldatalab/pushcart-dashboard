// collection for items and individual item's nutritional data 
var PurchaseItemsCollection = Backbone.Collection.extend({

  model: PurchaseItem,

  url: function() { 
    return pushcartHost + "/purchases/" + this.purchase.get('id') + "/items";
  },

  initialize: function(models, options) {
    console.log('collection options:');
    console.log(options);
    this.purchase = options.purchase;
  }

})
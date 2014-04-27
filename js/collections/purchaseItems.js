// collection for items and item's nutritional data 
var PurchaseItemsCollection = Backbone.Collection.extend({

  model: PurchaseItem,

  url: function() { 
    return pushcartHost + "/users/" + USER_ID + "/purchases/" + this.purchase.get('id') + "/items";
  },

  initialize: function(models, options) {
    // options declared on index.html
      this.purchase = options.purchase;
  }

})
Pushcart.Collections.PurchaseItems = Backbone.Collection.extend({
  
  model: Pushcart.Models.PurchaseItem,
  
  url: function(options) {
    return pushcartHost + "/users/" + this.userId + "/purchases/" + this.purchase.get('id') + "/items";
  },
  
  initialize: function(options) {
    this.userId = options.userId;
    this.purchase = options.purchase;
  }

});
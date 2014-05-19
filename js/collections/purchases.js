Pushcart.Collections.Purchases = Backbone.Collection.extend({
  
  model: Pushcart.Models.Purchase,
  
  url: function(options) {
    return pushcartHost + "/users/" + this.userId + "/purchases?show_items=true";
  },
  
  initialize: function(attrs) {
    this.userId = attrs.userId;
  }
  
});

Pushcart.Collections.Purchases = Backbone.Collection.extend({
  model: Pushcart.Models.Purchase,
  url: function(options) {
    return pushcartHost + "/users/" + this.userId + "/purchases";
  },
  initialize: function(attrs) {
    this.userId = attrs.userId;
  }
});


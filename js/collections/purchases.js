
var PurchaseCollection = Backbone.Collection.extend({
  
  model: PurchaseModel,
  
  url: function() {
    return pushcartHost + "/users/" + USER_ID + "/purchases";
  }
  
});
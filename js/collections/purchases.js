// collection for purchase history 
var PurchaseCollection = Backbone.Collection.extend({
  
  model: PurchaseModel,
  
  url: pushcartHost + "/purchases" 
  
});

// model representing items bought in the purchases & total nutritional data
var PurchaseItem = Backbone.Model.extend({
    
    url: function() {
      return pushcartHost + "/purchases/" + this.get('purchase_id') + "/items/" + this.get('id');
    }
    
});
Pushcart.Models.Purchase = Backbone.Model.extend({
  
  aggregates: function() {
    var result = {};
    var servingsPerContainer;
    var totalQty;

    _.each(this.get('items'), function(item) {        
      servingsPerContainer = item.nutritional_data.servings_per_container;
      
      if (servingsPerContainer === null) servingsPerContainer = 1;
      totalQty = item.quantity * servingsPerContainer;
    
      if (!result[item.category]) result[item.category] = 0;
      result[item.category] += totalQty;
    });

    return result;
  }
  
});
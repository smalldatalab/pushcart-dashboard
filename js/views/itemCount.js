Pushcart.Views.ItemCount = Backbone.View.extend({

  template: _.template($('#purchaseItemCount').html()),

  render: function(purchases){
    // console.log("rendering ItemCount!");
    // console.log(purchases);

    ps = purchases;
    
    // console.log(ps); 
    var html = this.template({purchases: purchases});
    // console.log(html);
    this.$el.append(html);
    return this;
  }
});



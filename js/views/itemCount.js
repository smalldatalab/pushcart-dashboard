Pushcart.Views.ItemCount = Backbone.View.extend({

  template: _.template($('#purchaseItemCount').html()),

  render: function(purchases){
    ps = purchases;
    var html = this.template({purchases: purchases});
    this.$el.append(html);
    return this;
  }
});



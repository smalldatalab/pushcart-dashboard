
Pushcart.Views.User = Backbone.View.extend({
  tagName: 'tr', 
  template: _.template($("#usersTemplate").html()),
  
  render: function(){ 
    var output = this.template({user: this.model.toJSON()});
    this.$el.append(output);
    return this;
  },

  events: {
    "click .userIdClickable": "reRenderPurchases",
  },

  reRenderPurchases: function(e){
    var userId = $(e.currentTarget).data('userid');
    var purchasesCollection = new Pushcart.Collections.Purchases({ userId: userId });
    var $collapser = $('.collapse-custom')
    $collapser.find(".purchase-view").remove();
    purchasesCollection.fetch().done(function() {
      purchasesCollection.each(function(model){
        var purchaseView = new Pushcart.Views.Purchase({
          userId: userId, 
          model: model
        });
        $collapser.append(purchaseView.render().el);
      });
    });
  }
});

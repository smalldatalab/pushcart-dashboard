Pushcart.Views.User = Backbone.View.extend({
  
  tagName: 'tr', 
  template: _.template($('#usersTemplate').html()),
  events: {
    'click .userIdClickable': 'reRenderPurchases'
  },
  render: function(){ 
    var output = this.template({user: this.model.toJSON()});
    this.$el.append(output);
    return this;
  },
  
  reRenderPurchases: function(e){
    var self = this;
    var userId = $(e.currentTarget).data('userid');
    var purchasesCollection = new Pushcart.Collections.Purchases({ userId: userId });
    var $collapser = $('.collapse-custom');
    this.model = new Pushcart.Models.User({ id: userId });
    this.model.fetch().done(function(response) {
      var userInfoView = new Pushcart.Views.UserInfo({ model: self.model });
      $('.user-info').html(userInfoView.render().el);
    });
    $collapser.find('.purchase-view').remove();
    purchasesCollection.fetch().done(function() {
      purchasesCollection.each(function(model){
        var purchaseView = new Pushcart.Views.Purchase({
          userId: userId, 
          model: model
        });
        $collapser.append(purchaseView.render().el);
      });

      self.reRenderPurchaseBreakdown(purchasesCollection);
      // self.reRenderUserInfoTable();
    });
  },
  reRenderPurchaseBreakdown: function(purchasesCollection) {
    Pushcart.purchasesBreakdown.setCollection(purchasesCollection);
    Pushcart.purchasesBreakdown.render();
  },
  
  reRenderUserInfoTable: function() {
    var usersModel = new Pushcart.Models.User;
    var $user = $('.user-info')
    $user.find('.user-info-table').remove();
  }

});
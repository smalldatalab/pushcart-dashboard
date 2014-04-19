
var PurchaseView = (function() {

  var PARENT = Backbone.View;

  return PARENT.extend({

    template: _.template($('#template-purchase-row').html()),

    initialize: function(options) {
      this.options = options;
      console.log(options)
    },

    render: function() {

      var self = this; 

      
      var data = _.extend({}, this.model.attributes, {
        row_number: this.options.rowNumber, 
        formatted_purchase_date: PushCart.DateFormatter.format(this.model.get('purchase_date'))
      }); 
      this.$el.html(this.template(data)); 

      this.itemsView = new PurchaseItemsView({
        el: this.$('.items-panel'),
        model: this.model
      }).render();

      
      _.extend(this.itemsView, Backbone.Events);
      this.itemsView.on('itemSelected', function(item) {
          self.currentItemChanged(item);
      });

      this.itemDetailView = new PurchaseItemDetailView({
        el: this.$('.item-details-panel')
      }).render();


      return this;
    },

    currentItemChanged: function(item) {
     //alert('Item changed: ' + item.get('id'));
     this.itemDetailView.model = item;
     this.itemDetailView.render();
    },

    remove: function() {
        this.itemsView.remove();
        PARENT.prototype.remove.call(this);
    },

  });

})();



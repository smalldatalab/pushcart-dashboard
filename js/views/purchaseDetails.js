var PurchaseDetailsView = Backbone.View.extend({

  template: _.template($('#template-purchase-item-details').html()),

  initialize: function(options) {
    this.options = options;
    console.log('purchase details initialize')
  },

  render: function() {
    var data = _.extend({}, this.model.attributes, {  
      row_number: this.options.rowNumber,     
    });
    console.log('Render details data:');
    console.log(data);
    console.log(this.el);


    var self = this;
    new PurchaseDetailsModel({id: this.model.get('id')}).fetch({
      success: function(model) {
        self.render(model);
      }
    });
    
    this.$el.html(this.template(data));

    return this;
  }

})
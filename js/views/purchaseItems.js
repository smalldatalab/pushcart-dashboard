var PurchaseItemsView = Backbone.View.extend({

  template: _.template($('#template-purchase-items').html()),

  rowTemplate: _.template($('#template-purchase-item-row').html()),

  events: {
    'click .item-category': 'itemClicked'
  },

  initialize: function(options) {
    this.options = options;

    this.collection = new PurchaseItemsCollection([], {
      purchase: this.model
    });
    this.listenTo(this.collection, 'sync', this.itemsFetched);
    this.collection.fetch(); 

  },

  itemClicked: function(e) {
    var rowIdx = $(e.target).closest('tr').index();
    var item = this.collection.at(rowIdx);
    this.trigger("itemSelected", item);
    return false;
  },

  render: function() {
    var data = {}; 
    console.log('Purchase Items render!') ;
    this.$el.html(this.template(data));
    this.renderItems();
    return this;
  },

  itemsFetched: function() {
    console.log('items fetched!');
    this.renderItems();
  },

  renderItems: function() {

    var self = this;
    console.log('Rendering the items!');
     var tbody = this.$('tbody');
     tbody.empty();
     this.collection.each(function(item) {
      
        var data = _.extend({
          link: item.url()
        }, item.attributes);
        console.log(data);
        var html = self.rowTemplate(data);
        tbody.append(html);
     });   
  }

})
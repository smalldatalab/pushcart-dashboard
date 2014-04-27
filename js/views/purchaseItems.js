// view responsible for items bought in a single purchase 
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

    this.chartsView = [];
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
    this.$el.html(this.template(data));
    this.renderItems();
    return this;
  },

  itemsFetched: function() {
    this.renderItems();
  },

  remove: function() {
    _.invoke(this.chartsView, 'remove');
    this.chartsView = [];

    Backbone.View.prototype.remove.call(this);
  },

  renderItems: function() {
     var tbody = this.$('tbody');
     tbody.empty();
     this.collection.each(function(item) {
  
        var data = _.extend({
          link: item.url()
        }, item.attributes);

        var row = $(this.rowTemplate(data));
        var chartView = new NutritionChartsView({
          el: row.find('td.item-charts'),
          model: item,
          size: 40
        });
        
        chartView.render();
        this.chartsView.push(chartView);
        tbody.append(row);
        
     }, this);   
  }
})
// view responsible for items bought in a single purchase 
Pushcart.Views.PurchaseItems = Backbone.View.extend({
  template: _.template($('#template-purchase-items').html()),
  rowTemplate: _.template($('#template-purchase-item-row').html()),
  
  initialize: function(options) {
    this.options = options;
    this.chartsView = [];
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

        // size = adjust canvas size for charts
        var chartView = new Pushcart.Views.NutritionCharts({
          el: row.find('td.item-charts'),
          model: item,
          size: 50
        });
        chartView.render();
        this.chartsView.push(chartView);
        tbody.append(row);
     }, this);   
  }
})
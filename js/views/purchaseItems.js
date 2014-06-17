Pushcart.Views.PurchaseItems = Backbone.View.extend({
  
  template: _.template($('#purchaseItemsTemplate').html()),
  rowTemplate: _.template($('#purchaseItemRowTemplate').html()),
  events: {
   'click .item-des-name': 'toggleNutritionalInfo'
  },
  
  initialize: function(options) {
    this.options = options;
    this.chartsView = [];
  },

  render: function() {
    var data = {}; 
    this.$el.html(this.template(data));
    this.renderItems();

    // get the category counts
    var categoryCounts = this.getCategoriesFromItems(this.collection);

    // render the item counts
    var itemCount = new Pushcart.Views.ItemCount;
    var itemCountView = itemCount.render(categoryCounts);
    this.$el.before(itemCountView.$el);
    this.attachNutritionalInfo();
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
   
      var chartView = new Pushcart.Views.NutritionCharts({
        el: row.find('td.item-charts'),
        model: item,
        size: 50
      });
      chartView.render();
      this.chartsView.push(chartView);
      tbody.append(row);
      this.attachNutritionalInfo(row.find('td:first-child'), item);
    }, this);  
  },


  getCategoriesFromItems: function(itemsCollection){
    var categories = {};
    var purchaseHash;

    // iterate over the items
    itemsCollection.each(function(item){  
      if (categories[item.get("category")] == null) {
        categories[item.get("category")] = 1;
      } else {
        categories[item.get("category")]++;
      }
    });
      
    return categories;
    console.log(categories);
  },

  attachNutritionalInfo: function($cell, item) {
    var $ul = $('<table />').addClass('nutritional-info'),
        nutrition,
        nutritionText,
        nutritionalToDisplay = [
          {
            displayName: 'Calcium DV',
            key: 'calcium_dv'
          }, {
            displayName: 'Iron DV',
            key: 'iron_dv'
          }, {
            displayName: 'Vitamin A DV',
            key: 'vitamin_a_dv'
          }, {
            displayName: 'Vitamin C DV',
            key: 'vitamin_c_dv'
          }
        ];
    if (item) {
      _(nutritionalToDisplay).each(function(nutrition) {
        nutritionText = nutrition.displayName + ':   ' + item.toJSON().nutritional_data[nutrition.key];
        $('<td />').text(nutritionText).appendTo($ul);
      });
    }
    $ul.appendTo($cell);
  },

  toggleNutritionalInfo: function(event) {
    $(event.currentTarget).find('.nutritional-info').slideToggle();
  }

})
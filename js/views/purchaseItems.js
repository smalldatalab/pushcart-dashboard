Pushcart.Views.PurchaseItems = Backbone.View.extend({
  
  template: _.template($('#purchaseItemsTemplate').html()),
  rowTemplate: _.template($('#purchaseItemRowTemplate').html()),
  events: {
   'click .item-des-name': 'toggleNutritionalInfo'
  },
  
  initialize: function(options) {
    this.options = options;
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

  renderItems: function() {
    var tbody = this.$('tbody');
    tbody.empty();
   
    this.collection.each(function(item) {
      var data = _.extend({
        link: item.url()
      }, item.attributes);
      
      var row = $(this.rowTemplate(data));
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
  },

  attachNutritionalInfo: function($cell, item) {
    var $table = $('<table />').addClass('nutritional-info'),
        nutrition,
        nutritionText,
        nutritionalToDisplay = [
          {
            displayName: 'Serving Size',
            key: 'serving_size_qty'
          },
          {
            displayName: 'Servings Per Container',
            key: 'servings_per_container'
          },
          {
            displayName: 'Calories',
            key: 'calories'
          },
          {
            displayName: 'Calories from Fat',
            key: 'calories_from_fat'
          },
          {
            displayName: 'Cholesterol',
            key: 'cholesterol'
          },
          {
            displayName: 'Monounsaturated Fat',
            key: 'monounsaturated_fat'
          },
          {
            displayName: 'Polyunsaturated Fat',
            key: 'polyunsaturated_fat'
          },
          {
            displayName: 'Saturated Fat',
            key: 'saturated_fat'
          },
          {
            displayName: 'Total Fat',
            key: 'total_fat'
          },
          {
            displayName: 'Trans Fatty Acid',
            key: 'trans_fatty_acid'
          },
          {
            displayName: 'Fiber',
            key: 'dietary_fiber'
          },
          {
            displayName: 'Protein',
            key: 'protein'
          },
          {
            displayName: 'Sodium',
            key: 'sodium'
          },
          {
            displayName: 'Sugar',
            key: 'sugars'
          },
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
        $('<tr />').text(nutritionText).appendTo($table);
      });
    }
    $table.appendTo($cell);
  },

  toggleNutritionalInfo: function(event) {
    $(event.currentTarget).find('.nutritional-info').slideToggle();
  }

})
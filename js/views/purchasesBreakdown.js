Pushcart.Views.PurchasesBreakdown = Backbone.View.extend({
     
  el: '#bar-charts-container',    

  setCollection: function(collection) {
    this.collection = collection;
    return this;  
  },

  collectCategories: function(aggregates) {
    var categories = {};
    _.each(aggregates, function(aggregate) {
      for (var category in aggregate) {
        categories[category] = true;
      }
    });
    categories = _.keys(categories);
    // categories.sort();
    return categories;
  },

  collectAllCategories: function() {
    var categoryNames = _.keys(this.colorsMapping);
    // categoryNames.sort();
    return categoryNames;
  },
  
  colorsMapping: {
   'Snacks'             : 'rgba(202, 198, 223, 0.9)',
   'Bakery'             : 'rgba(250, 226, 94, 0.9)',
   'Breakfast'          : 'rgba(250, 226, 94, 0.9)',
   'Pasta'              : 'rgba(250, 226, 94, 0.9)',
   'Diary'              : 'rgba(153, 215, 219, 0.9)',
   'Diary & Eggs'       : 'rgba(153, 215, 219, 0.9)',
   'Deli'               : 'rgba(246, 135, 89, 0.9)',
   'Meat'               : 'rgba(246, 135, 89, 0.9)',
   'Fruit'              : 'rgba(183, 210, 69, 0.9)',
   'Produce'            : 'rgba(183, 210, 69, 0.9)',
   'Vegetable & Herbs'  : 'rgba(183, 210, 69, 0.9)',
   'Grocery'            : 'rgba(250, 225, 203, 0.9)',
   'Seasonal'           : 'rgba(250, 225, 203, 0.9)',
   'Bulk'               : 'rgba(250, 225, 203, 0.9)',
   'Household'          : 'rgba(250, 225, 203, 0.9)'
  },
       
  render: function() {
    var container = this.$el;
    container.empty();

    var aggregates = this.collection.map(function(purchase) {      
     return purchase.aggregates();
    });

    //var categories = this.collectCategories(aggregates);
    var categories = this.collectAllCategories();

    var datasets = _.map(categories, function(category) {
      var row = _.map(aggregates, function(aggregate) {
        var qtyInCategory = aggregate[category];
        return qtyInCategory ? qtyInCategory : 0;        
      });
      return row;
    });
               
    var labels = this.collection.map(function(purchase) {
      return purchase.get('purchase_date').substr(0, 10);
    });

    if (datasets.length > 0) {
      this.renderPlot(datasets, labels, categories);
    }
    return this;
  },
   

  renderPlot: function(datasets, labels, categories) {

    var seriesLabels = _.map(categories, function(category) {
      return { label: category};
    });

    var mapping = this.colorsMapping;

    var colorsForLabels =  _.map(categories, function(category) {
      var defaultColor = 'rgba(250, 225, 203, 0.9)';
      return mapping[category] ? mapping[category] : defaultColor;
    });    

    var plot = $.jqplot('bar-charts-container', datasets, {
      // Tell the plot to stack the bars.
      stackSeries: true,
      captureRightClick: true,
      seriesDefaults:{
        renderer:$.jqplot.BarRenderer,
        rendererOptions: {
          // Put a 30 pixel margin between bars.
          barMargin: 30,
          // Highlight bars when mouse button pressed.
          // Disables default highlighting on mouse over.
          highlightMouseDown: true,
          varyBarColor: true  
        },
        pointLabels: {        
          show: false
        }
      },

    series: seriesLabels,

    seriesColors: colorsForLabels, 
          
    axes: {
      xaxis: {
          renderer: $.jqplot.CategoryAxisRenderer,
          ticks: labels
      },
      yaxis: {
        // Don't pad out the bottom of the data range.  By default,
        // axes scaled as if data extended 10% above and below the
        // actual range to prevent data points right on grid boundaries.
        // Don't want to do that here.
        padMin: 0
      }
    },

    legend: {
      show: false,
      location: 'e',
      placement: 'outside'
    }      
    });
  },

});
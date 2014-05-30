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
  'Snacks'             : 'rgb(202, 198, 223)',
  'Bakery'             : 'rgb(250, 226, 94)',
  'Breakfast'          : 'rgb(250, 226, 94)',
  'Pasta'              : 'rgb(250, 226, 94)',
  'Diary'              : 'rgb(153, 215, 219)',
  'Diary & Eggs'       : 'rgb(153, 215, 219)',
  'Deli'               : 'rgb(246, 135, 89)',
  'Meat'               : 'rgb(246, 135, 89)',
  'Fruit'              : 'rgb(183, 210, 69)',
  'Produce'            : 'rgb(183, 210, 69)',
  'Vegetable & Herbs'  : 'rgb(183, 210, 69)',
  'Grocery'            : 'rgb(134, 127, 113)',
  'Seasonal'           : 'rgb(134, 127, 113)',
  'Bulk'               : 'rgb(134, 127, 113)',
  'Household'          : 'rgb(134, 127, 113)'
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
      var defaultColor = 'rgb(134,127, 113)';
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
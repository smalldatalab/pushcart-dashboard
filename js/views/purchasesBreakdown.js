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
    return categories;
  },

  collectAllCategories: function() {
    var categoryNames = _.keys(this.colorsMapping);
    // categoryNames.sort();
    return categoryNames;
  },
  
  colorsMapping: {
    'Seasonal'           : 'rgb(134, 127, 113)',
    'Bulk'               : 'rgb(134, 127, 113)',
    'Canned Goods'       : 'rgb(134, 127, 113)',
    'Grocery'            : 'rgb(134, 127, 113)',
    'Pantry'             : 'rgb(134, 127, 113)',
    'International'      : 'rgb(134, 127, 113)',
    'Frozen'             : 'rgb(134, 127, 113)',
    'Alcohol'            : 'rgb(134, 127, 113)',
    'Wine'               : 'rgb(134, 127, 113)',
    'Coffee'             : 'rgb(134, 127, 113)',
    'Beverages'          : 'rgb(134, 127, 113)',
    'Buy Big'            : 'rgb(134, 127, 113)',    

    'Snacks'             : 'rgb(202, 198, 223)',

    'Fruit'              : 'rgb(183, 210, 69)',
    'Produce'            : 'rgb(183, 210, 69)',
    'Vegetable & Herbs'  : 'rgb(183, 210, 69)',
   

    'Deli'               : 'rgb(246, 135, 89)',
    'Meat'               : 'rgb(246, 135, 89)',
    'Meat & Seafood'     : 'rgb(246, 135, 89)',
    'Seafood'            : 'rgb(246, 135, 89)',

    'Diary'              : 'rgb(153, 215, 219)',
    'Diary & Eggs'       : 'rgb(153, 215, 219)',
    'Cheese'             : 'rgb(153, 215, 219)',

    'Bakery'             : 'rgb(250, 226, 94)',
    'Breakfast'          : 'rgb(250, 226, 94)',
    'Pasta'              : 'rgb(250, 226, 94)',
    'Dry Goods & Pasta'  : 'rgb(250, 226, 94)'
  },
       
  render: function() {
    var container = this.$el;
    container.empty();

    var aggregates = this.collection.map(function(purchase) {      
     return purchase.aggregates();
    });

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

    $.jqplot.config.catchErrors = true;

    var seriesLabels = _.map(categories, function(category) {
      return { label: category};
    });

    var mapping = this.colorsMapping;

    var colorsForLabels =  _.map(categories, function(category) {
      var defaultColor = 'white';
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
      renderer: $.jqplot.EnhancedLegendRenderer,
      show: true,
      location: 'e',
      placement: 'outside',
      // labels: labels,
      marginTop: 0,
      rendererOptions: {
        numberRows: 9,
        numberColumns: 3,
        seriesToggle: false,
        disableIEFading: true
      }
    }      
  });
  },

});
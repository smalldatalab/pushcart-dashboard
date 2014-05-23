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
    categories.sort();
    return categories;
  },

  render: function() {
    var container = this.$el;
    container.empty();
    // each s_n must be purchases.length big
    // 
    // s1[0] = 1st category in the 1st purchase
    // s1[1] = 1st category in the 2nd purchase

    // s1[n] = 1st category in the last purchase
    // s2[0] = 2nd category in the 1st purchase
    // s2[1] = 2nd 
    /*
    var datasets = [  
    [ 2, 6, 0, 10],
    [ 0, 5, 3, 4],
    [ 14, 9, 3, 0]
    ];
    */
    // http://www.jqplot.com/tests/bar-charts.php

    var aggregates = this.collection.map(function(purchase) {      
     return purchase.aggregates();
    });

    var categories = this.collectCategories(aggregates);

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
          highlightMouseDown: true   
        },
        pointLabels: {        
          show: false
        }
      },

    series: seriesLabels,
          
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
      show: true,
      location: 'e',
      placement: 'outside'
    }      
    });
  },

});
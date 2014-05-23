Pushcart.Views.NutritionCharts = Backbone.View.extend({

  initialize: function(options) {
    this.chartSize = options.size;
    this.chartsData = [];
  },

  getNutritionalValues: function() { 
    var data = this.model.get('nutritional_data');
    // if value returns undefined/null, default to 0
    var vitaminAVal = data.vitamin_a_dv || 0;
    var vitaminCVal = data.vitamin_c_dv || 0;
    var ironVal = data.iron_dv || 0;
    var calcVal = data.calcium_dv || 0;

    this.chartsData[0]  = [
      {
        value: vitaminAVal,
        color: 'rgba(159, 202, 107, 0.9)',
      },
      {
        value: 100 - vitaminAVal, 
        color: 'rgba(110, 127, 149, 0.2)',
      }
    ];

    this.chartsData[1] = [
      {
        value: vitaminCVal,
        color: 'rgba(159, 202, 107, 0.9)',
      },
      {
        value: 100 - vitaminCVal, 
        color: 'rgba(110, 127, 149, 0.2)',
      }
    ];
 
    this.chartsData[2] = [
      {
       value: ironVal,
       color: 'rgba(159, 202, 107, 0.9)',
      },
      {
        value: 100 - ironVal, 
        color: 'rgba(110, 127, 149, 0.2)',
      }
    ];
 
    this.chartsData[3] =[
      {
       value: calcVal,
       color: 'rgba(159, 202, 107, 0.9)',
      },
      {
        value: 100 - calcVal, 
        color: 'rgba(110, 127, 149, 0.2)',
      }
    ];
  },

  render: function() {
      this.$el.empty();
      if (this.model) this.renderCharts();
      return this;
    },

  renderCharts: function() {  
    this.getNutritionalValues();
    for (var i in this.chartsData) {
      var cvx = $('<canvas>').attr('width', this.chartSize).attr('height', this.chartSize);
      this.$el.append(cvx);
      new Chart(cvx.get(0).getContext('2d')).Doughnut(this.chartsData[i]);
    }
  }
  
});
// nutritional info for individual purchased items
var PurchaseItemDetailView = Backbone.View.extend({

  template: _.template($('#template-purchase-item-details').html()),

  initialize: function() {
    this.chartsData = [];
  },

  calculateChartsData: function() {

    var data = this.model.get('nutritional_data');
      
    //console.log('nutritional data:');
    //console.log(data);

    //data.vitamin_a_dv = 25;

    var vitaminAVal = data.vitamin_a_dv || 0;
    var vitaminCVal = data.vitamin_c_dv || 0;
    var ironVal = data.iron_dv || 0;
    var calcVal = data.calcium_dv || 0;


    this.chartsData[0]  = [
      {
       value: vitaminAVal,
       color: "rgb(159, 202, 107)",
      },
      {
        value: 100 - vitaminAVal, 
        color: "rgba(110, 127, 149, 0.7)",
      }
    ];

    this.chartsData[1] = [
      {
        value: vitaminCVal,
        color: "rgb(159, 202, 107)",
      },
      {
        value: 100 - vitaminCVal, 
        color: "rgba(110, 127, 149, 0.7)",
      }
    ];

    this.chartsData[2] = [
      {
        value: ironVal,
        color: "rgb(159, 202, 107)",
      },
      {
        value: 100 - ironVal, 
        color: "rgba(110, 127, 149, 0.7)",
      }
    ];

    this.chartsData[3] =[
      {
        value: calcVal,
        color: "rgb(159, 202, 107)",
      },
      {
        value: 100 - calcVal, 
        color: "rgba(110, 127, 149, 0.7)",
      }
    ];

  },

  render: function() {
    console.log(this.template());
    this.$el.html(this.template());
    if (this.model) this.renderCharts();
    return this;
  },

  renderCharts: function() {
    
    this.calculateChartsData();

    console.log(this.chartsData);

    //this.$('.charts').empty();
    for (var i in this.chartsData) {
      var cvx = $('<canvas/>').attr({width: 100, height: 100});
      this.$('.charts').append(cvx);
      new Chart(cvx.get(0).getContext("2d")).Doughnut(this.chartsData[i]);
    }
  }

});
Pushcart.Views.EmailTimeline = Backbone.View.extend({
  
  el: '#timeline-embed',

  render: function(){
    var groceryData;
    
    Pushcart.emails.each(function(data){
      data = data.toJSON();
      groceryData = {
        timeline: {
          headline: "User " + data.id,
          type: "default",
          text: "emails",     
          date: [{
            startDate: data.date,
            text: data.message,
            headline: data.subject_line
          }]
        }
      }
    });  

    createStoryJS({
      type: 'timeline',
      width: '800',
      height: '330',
      source: groceryData,
      embed_id: 'timeline-embed',
      debug: true,
      css: 'css/timeline.css',    
      js: 'js/lib/timeline-min.js' 
    });
    return this;
  }
});


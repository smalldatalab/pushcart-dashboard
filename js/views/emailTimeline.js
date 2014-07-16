Pushcart.Views.EmailTimeline = Backbone.View.extend({
  
  el: '#tabs-1',
  events: {
    'click .flag-content': 'renderTab'
  },

  render: function(){
    // var groceryData;
    
    Pushcart.emails.each(function(data){
      data = data.toJSON();
      Pushcart.groceryData = {
        timeline: {
          headline: "User _",
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
      source: Pushcart.groceryData,
      embed_id: 'timeline-embed',
      debug: true,
      css: 'css/timeline.css',    
      js: 'js/lib/timeline-min.js' 
    });

    return this;
  },

  renderTab: function(){
    var num_tabs = $("div#tab_wrapper ul li").length + 1;

    $("div#tab_wrapper ul").append(
        "<li><a href='#tabs-" + num_tabs + "'>" + num_tabs + "</a><span class='ui-icon ui-icon-circle-close ui-closable-tab'></span></li>"
    );
    
    $("div#tab_wrapper").append(
        "<div id='tabs-" + num_tabs + "'>" + Pushcart.groceryData.timeline.date[0].text + "</div>"
    );
    
    $("div#tab_wrapper").tabs("refresh"); 

    var tabs = $("#tab_wrapper").tabs();

     tabs.delegate( "span.ui-icon", "click", function() {
      console.log("button clicked");
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });

  tabs.bind( "keyup", function( event ) {
    if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
      var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    }
  });
  }

});


Pushcart.Views.EmailTimeline = Backbone.View.extend({
  
  el: '#tabs-1',
  events: {
    'click .flag-content': 'renderTab'
  },

  render: function(){
    // var dates = message.map(function(message){
    //   return message.get('created_at').substr(0,10);
    // });

    var messages = Pushcart.emails.toJSON();
    var messagesJquery = $(messages);

    var storyjs_data = { 
      "timeline": {
        headline: "Email History",
        type: "default",
        text: "",   
        date:[]
      }
    };

    messagesJquery.each(function(index, message){
      var _date = {
        startDate: message.created_at,
        headline: message.subject,
      };  
      storyjs_data.timeline.date.push(_date);       
    });

    createStoryJS({
      type:     'timeline',
      width:     '700',
      height:    '400',
      source:     storyjs_data,
      embed_id:  'timeline-embed',
      css:       'css/timeline.css',    
      js:        'js/lib/timeline-min.js'
    });
    return this;
  },

  renderTab: function(){
    var num_tabs = $("div#tab_wrapper ul li").length + 1;

    $("div#tab_wrapper ul").append(
        "<li><a href='#tabs-" + num_tabs + "'>" + num_tabs + "</a><span class='ui-icon ui-icon-circle-close ui-closable-tab'></span></li>"
    );
    
    $("div#tab_wrapper").append(
        "<div id='tabs-" + num_tabs + "'>" + "email message details here" + "</div>"
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


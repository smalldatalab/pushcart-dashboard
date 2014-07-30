Pushcart.Views.EmailTimeline = Backbone.View.extend({

  render: function() {
    var messages = Pushcart.emails.toJSON();
    var messagesJquery = $(messages);

    var storyjs_data = {
      "timeline": {
        headline: "Email History",
        type: "default",
        text: "",
        date: []
      }
    };

    messagesJquery.each(function(index, message) {
      var _date = {
        startDate: message.created_at.substr(0, 10).split("-").join(),
        headline: message.subject,
      };
      storyjs_data.timeline.date.push(_date);
    });

    createStoryJS({
      type: 'timeline',
      width: '800',
      height: '400',
      source: storyjs_data,
      embed_id: 'timeline-embed',
      css: 'css/timeline.css',
      js: 'js/lib/timeline-min.js'
    });
    return this;
  }

});
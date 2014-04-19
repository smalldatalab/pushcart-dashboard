// moment.js 
var PushCart = PushCart || {};

PushCart.DateFormatter = (function(moment, $) {

  return {

    format: function(date) {
      return moment(date).format("MMM Do YYYY");
    }

  }

})(moment, jQuery);


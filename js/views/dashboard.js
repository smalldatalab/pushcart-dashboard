// moment.js  
var PushCart = PushCart || {};

PushCart.DateFormatter = (function(moment, $) {

  var dateFormat = "MMM Do YYYY"; 

  return {
    format: function(date) {
      return moment(date).format(dateFormat);
    }
  }
})(moment, jQuery);


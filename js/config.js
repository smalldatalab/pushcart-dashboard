 window.Pushcart = {
      Models: {},
      Collections: {},
      Views: {},
      Routers:{}
};

// ensure app format's dates consistently with the function Pushcart.DateFormatter.format(date)
Pushcart.DateFormatter = (function(moment, $) {
  var dateFormat = "MMM Do YYYY"; 

  return {
    format: function(date) {
      return moment(date).format(dateFormat);
    }
  }
})(moment, jQuery);
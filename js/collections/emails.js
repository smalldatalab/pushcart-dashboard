Pushcart.Collections.Emails = Backbone.Collection.extend({

  model: Pushcart.Models.Email,
 
  url: function(options){
    return pushcartStaging + '/users/' + this.userId + '/messages';
  },

  initialize: function(options) {
    this.userId = options.userId;
  },

})
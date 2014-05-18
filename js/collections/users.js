Pushcart.Collections.Users = Backbone.Collection.extend({
  
  model: Pushcart.Models.User,
  
  url: function(){
     return pushcartHost + '/users';
  }
  
});
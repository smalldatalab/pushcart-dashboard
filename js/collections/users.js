
Pushcart.Collections.Users = Backbone.Collection.extend({
  model: Pushcart.Models.User,
  url: function(){
     return pushcartHost + '/users'
   },
});

var usersCollection = new Pushcart.Collections.Users

usersCollection.fetch({
  success: function(userCollection){
    userCollection.each(function(userModel){
      var view = new Pushcart.Views.User({model: userModel});
      $('table').append(view.render().el);  
    });
    
  }
});


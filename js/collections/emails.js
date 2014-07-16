Pushcart.Collections.Emails = Backbone.Collection.extend({

  model: Pushcart.Models.Email,
 
  url: function(){
    return pushcartStaging + '/users/' + '7' + '/messages';
  } 

})
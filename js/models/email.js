Pushcart.Models.Email = Backbone.Model.extend({

  url: function(){
    return pushcartStaging + '/users/' + this.get('id') + '/messages' + this.get('id');
  }

})
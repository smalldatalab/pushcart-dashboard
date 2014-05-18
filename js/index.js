//create a users collection and a "bar chart" of the purchases breakdown
Pushcart.users              = new Pushcart.Collections.Users;
Pushcart.purchasesBreakdown = new Pushcart.Views.PurchasesBreakdown();

Pushcart.users.fetch({
  success: function(users){                  
    users.each(function(user){              
      var view = new Pushcart.Views.User({  
        model: user
      });
      $('table').append(view.render().el);  
    });
  }
});
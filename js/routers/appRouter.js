window.Pushcart.Routers.AppRouter = Backbone.Router.extend({

  routes: {
    "": "loadHome",
    "admin": "loadAdmin"
  },

  loadHome: function() {
    if (Pushcart.accessToken === '') {
      var login = new Pushcart.Views.Login();
      $('.main').append(login.render().el);
    }
  },

  loadAdmin: function() {
    if (Pushcart.accessToken == '') {
      this.navigate("", {trigger: true});
    }

    Pushcart.users              = new Pushcart.Collections.Users;  
    Pushcart.purchasesBreakdown = new Pushcart.Views.PurchasesBreakdown();

    $('.login-container').fadeOut();
    $('.wrap').detach();
 
    $('.tab_ul').append('<li><a href="#tabs-1"> Purchases Overview </a></li>');

    // tabs container 
    $("#tab_wrapper").tabs();

    // users list table
    Pushcart.users.fetch({
      success: function(users){                  
        users.each(function(user){              
          var view = new Pushcart.Views.User({  
            model: user
          });
        $('.user-table').append(view.render().el);  
        });
      }
    });

    // header for users list table
    var usersTableHeader = new Pushcart.Views.UsersTableHeader();
    $('.user-table').append(usersTableHeader.render().el);

   // user info table categories
    var userInfoCategories = new Pushcart.Views.UsersInfoHeader();
    userInfoCategories.render();

    // header for dashboard header
    var dashboardHeader = new Pushcart.Views.DashboardHeader();
    dashboardHeader.render(); 

    // purchases overview legend
    var purchasesLegend = new Pushcart.Views.PurchasesLegend();
     $('#tabs-1').append(purchasesLegend.render().el);

    // header for purchases table 
    var purchasesTableHeader = new Pushcart.Views.PurchasesTableHeader();
    purchasesTableHeader.render();

  }

});
window.Pushcart.Routers.AppRouter = Backbone.Router.extend({

  routes: {
    "": "loadHome",
    "admin": "loadAdmin"
  },

  loadHome: function() {
    Pushcart.users              = new Pushcart.Collections.Users;
    Pushcart.purchasesBreakdown = new Pushcart.Views.PurchasesBreakdown();
    Pushcart.emails = new Pushcart.Collections.Emails;
        Pushcart.emails.fetch({
          sucess: function(){
            console.log("JSON file fetched", Pushcart.emails);
          },
          error: function(){
            console.log("error loading JSON")
          }
        })
    if (Pushcart.accessToken == '') {
      var login = new Pushcart.Views.Login();
      $('.main').append(login.render().el);
    }
  },

  loadAdmin: function() {
    // create a users collection and a "bar chart" of the purchases breakdown
    Pushcart.users              = new Pushcart.Collections.Users;
    Pushcart.purchasesBreakdown = new Pushcart.Views.PurchasesBreakdown();
    
    if (Pushcart.accessToken == '') {
      this.navigate("", {trigger: true});
    }

    $('.login-container').fadeOut();
    $('.wrap').detach()

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
    $('body').append(usersTableHeader.render().el);

    // user info table categories
    var userInfoCategories = new Pushcart.Views.UsersInfoHeader();
    $('.user-info-categories').append(userInfoCategories.render().el);
    
    // header for dashboard header
    var dashboardHeader = new Pushcart.Views.DashboardHeader();
    $('.content-header').append(dashboardHeader.render().el);

    // header for purchases section header
    var purchasesSectionHeader = new Pushcart.Views.PurchasesSectionHeader();
    $('.bar-charts').append(purchasesSectionHeader.render().el);

    // purchases overview legend
    var purchasesLegend = new Pushcart.Views.PurchasesLegend();
    $('.purchases-legend').append(purchasesLegend.render().el);

    // header for purchases table 
    var purchasesTableHeader = new Pushcart.Views.PurchasesTableHeader();
    $('.collapse-custom').append(purchasesTableHeader.render().el);
  }

});
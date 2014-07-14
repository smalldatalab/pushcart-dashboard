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
    Pushcart.users              = new Pushcart.Collections.Users;
    Pushcart.purchasesBreakdown = new Pushcart.Views.PurchasesBreakdown();
    Pushcart.emails = new Pushcart.Collections.Emails;
    
    Pushcart.emails.fetch().complete(function(){
      console.log("JSON data fetched");
      emailTimelineView = new Pushcart.Views.EmailTimeline;
      emailTimelineView.render();
    })

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
    $('.user-table').append(usersTableHeader.render().el);

   // user info table categories
    var userInfoCategories = new Pushcart.Views.UsersInfoHeader();
    userInfoCategories.render();

    // header for dashboard header
    var dashboardHeader = new Pushcart.Views.DashboardHeader();
    dashboardHeader.render(); 

    // header for purchases section header
    var purchasesSectionHeader = new Pushcart.Views.PurchasesSectionHeader();
    purchasesSectionHeader.render();

    // purchases overview legend
    var purchasesLegend = new Pushcart.Views.PurchasesLegend();
    purchasesLegend.render();

    // header for purchases table 
    var purchasesTableHeader = new Pushcart.Views.PurchasesTableHeader();
    purchasesTableHeader.render();

  }

});
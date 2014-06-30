window.Pushcart = {};
Pushcart.accessToken = '';

function getAccessToken( clientId, clientSecret ) {
  
  $.ajax({
    type: 'POST',
    url:  'http://gopushcart.com/api/v1/oauth/token',
    xhrFields: { withCredentials: true},
    data: {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    },
    
    error: function() {
      alert('wrong username and/or password');
    },
    
    success: function(data){
      Pushcart.accessToken = data.access_token;
      sessionStorage.setItem('accessToken', data.access_token);
      
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
}
//render log-in view 
$(function(){
    var login = new Pushcart.Views.Login();
    $('.main').append(login.render().el);
});

//create a users collection and a "bar chart" of the purchases breakdown
Pushcart.users              = new Pushcart.Collections.Users;
Pushcart.purchasesBreakdown = new Pushcart.Views.PurchasesBreakdown();

// Social share
app.factory ('$socialshare', function ($filter) {

  var factory = {}; 

  //https://blog.nraboy.com/2014/10/implement-social-media-sharing-ionicframework/
  factory.share = function(p) {
    var msg="Check this out: " + $filter('number')(p.likes) + " likes! " + 
      p.link + " by " + p.username + ".\n\nSee more at top photos, https://topp.firebaseapp.com.\n";

    if (window.plugins && window.plugins.socialsharing) {
        window.plugins.socialsharing.share(msg, "Top Photos");
    } else {
        console.log("Share plugin not available");
    }
  }
  
  return factory;
});

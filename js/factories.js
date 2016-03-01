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
  };
  
  return factory;
});



// Local storage management 
app.factory ('$hidelist', function ($localStorage) {
  var factory = {};

  $localStorage = $localStorage.$default({
    topphotos_hide_list: {},
    topphotos_bob_hide_list: {}
  });

  var MAX_LIST_COUNT=100;

  var _addHide = function(id, hideList) {
     var keys = Object.keys(hideList);
    if (keys.length>MAX_LIST_COUNT) {
      // console.log("remove one" + keys[0]);
      delete hideList[keys[0]];
    }

    hideList[id] = true;
  };

   // set all hides in once
  var _checkHides = function(list, hideList) {
     if (hideList === undefined) {
      return;
    }

    //console.log("mark: " + list[0].id);
    for (var key in list) {
      var p = list[key];
      if (hideList[p.id]) {
        p.hide = true;
      }
    }
  };


  factory.add = function (id) {
    _addHide(id, $localStorage.topphotos_hide_list);
  };

  factory.addBob = function (id) {
     _addHide(id, $localStorage.topphotos_bob_hide_list);
  };


  // set all in once
  factory.markHides = function(list) {
    _checkHides(list, $localStorage.topphotos_hide_list);
  };

   // set all in once
  factory.markBobHides = function(list) {
    _checkHides(list, $localStorage.topphotos_bob_hide_list);
  };



  return factory;
});
app.controller("BobCtrl", function ($scope, $sce, $document, $hidelist, $socialshare, $timeout, $http,
  $ionicModal, $ionicScrollDelegate) {

  var smileURL = "https://topphotos.firebaseapp.com/";

  // Need to get the pointer
  $scope.share = $socialshare.share;
  $scope.isWebView = ionic.Platform.isWebView();

  $scope.smiles=[];

  $scope.var = {'order':true,
                'errorTrialCount': 0, // how many trials for error?
                'switchLoading': false}; // to show spins to switch option

  // Main image loader
  // Will be loaded bu 
  $scope.getBob = function() {
    var url = smileURL+($scope.var.order ? "bob-order":"bob-recent")+".jo";
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    
    var promise = $http.get(url, {cache: false})
        .success(function(response) {

          // mark all hide candidates
          $hidelist.markBobHides(response);
          
          // clear the error cound if any
          $scope.var.errorTrialCount = 0;
          $scope.smiles =  response;
        })
        .error(function(data, status, headers, config) {
          $scope.var.errorTrialCount++;
        }).finally(function() {
           $scope.var.switchLoading = false; // we are done anyway
        });
  };

  //load once
  $scope.var.switchLoading = true;
  $scope.getBob();

  // https://blog.nraboy.com/2014/09/handling-apache-cordova-events-ionicframework/
  // Update when this comes back to foreground
  /*
  document.addEventListener("resume", function() {
    $scope.getBob();
  }, false);
*/

  $scope.hidePhoto = function(photo) {
    console.log("Hide: " + photo.id);
    $hidelist.addBob(photo.id);
  };


  // http://stackoverflow.com/questions/21292114/external-resource-not-being-loaded-by-angularjs
  // play video with the clipsrc
  $scope.playVideo = function(clipsrc) {
    $scope.clipSrc = $sce.trustAsResourceUrl(clipsrc);
    //console.log($scope.clipSrc);
    $scope.showModal('templates/video-pop.html');
  };
  
  // https://devdactic.com/images-videos-fullscreen-ionic/
  // Showing videos and movies
  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();

      // iOS uses the native player. Let's deal with "Done" button      
      var video = document.getElementById('video');
      if (video!==undefined && video) {
        // http://stackoverflow.com/questions/11112150/with-an-html5-video-element-on-the-iphone-how-can-i-detect-the-difference-betwe?lq=1
        video.addEventListener('webkitendfullscreen', $scope.closeModal, false);
      }

    });
  };
 
  // Close the modal
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };
});

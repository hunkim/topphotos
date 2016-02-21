
app.controller("TodayCtrl", function ($scope, $sce, $document, $timeout, $http, 
  $ionicModal, $ionicScrollDelegate) {

  const smileURL = "https://topphotos.firebaseapp.com/";
  const maxPhotos = 100;
  var jsonIndex = 1;

  $scope.smiles=[];  

  $scope.var = {'order':true, 
                'errorTrialCount': 0, // how many trials for error?
                'switchLoading': false}; // to show spins to switch option

  // Main image loader
  // Will be loaded bu 
  $scope.getImages = function(refresh) {
    if(refresh==true) { // reset the loading
      jsonIndex = 1;
    }

    var url = smileURL+($scope.var.order ? "orders-":"photos-")+jsonIndex+".json"
    
    //console.log(url);

    var promise = $http.get(url, {cache: false}) 
        .success(function(response) {
          // clear the error cound if any
          $scope.var.errorTrialCount = 0;

          // data cleaning should be inside so that when there is no connection, 
          // still users can see something.
          if(refresh==true || $scope.smiles.length > maxPhotos) {
            $scope.smiles =[];
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
          }

          $scope.smiles =  $scope.smiles.concat(response);
          jsonIndex++; // ready to get the next page
        })
        .error(function(data, status, headers, config) {
          $scope.var.errorTrialCount++;  

          if (status=="404" && $scope.var.errorTrialCount < 3) {
            console.log(url + " 404"); // the end of list.
            $scope.getImages(true); // refresh? only it's smaller than 3
          }
        }).finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
           $scope.$broadcast('scroll.infiniteScrollComplete');
           $scope.var.switchLoading = false; // we are done anyway
        });
  }

  // https://blog.nraboy.com/2014/09/handling-apache-cordova-events-ionicframework/
  // Update when this comes back to foreground
  document.addEventListener("resume", function() {
    $scope.getImages(true);
  }, false);

  // http://stackoverflow.com/questions/21292114/external-resource-not-being-loaded-by-angularjs
  // play video with the clipsrc
  $scope.playVideo = function(clipsrc) {
    $scope.clipSrc = $sce.trustAsResourceUrl(clipsrc);
    //console.log($scope.clipSrc);
    $scope.showModal('templates/video-pop.html');
  }

  $scope.showImg = function(imgURL) {
    $scope.imgURL = $sce.trustAsResourceUrl(imgURL);
    $scope.showModal('templates/img-pop.html');
  }
  
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
  }
 
  // Close the modal
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };
})
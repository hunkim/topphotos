//http://stackoverflow.com/questions/34586746/ng-click-not-working-on-ion-item-inside-ion-side-menu

app.directive('itemHead', function($compile) {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      p: '=p'
    }, 
    templateUrl: 'templates/itemHead.html'
  }
});

app.directive('itemBody', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      p: '=p'
    }, 
    templateUrl: 'templates/itemBody.html'
  }
});


app.directive('connError', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      call: '@call'
    }, 
    templateUrl: 'templates/connError.html'
  }
});

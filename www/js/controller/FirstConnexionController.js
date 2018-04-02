angular.module('StoriginAcademy.controllers').controller('FirstConnexionCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

  localStorage.setItem("firstConnexion", true );

  // Called to navigate to the main app
  $scope.Start = function()
  {
    $state.go('app.home');
  };

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };


})
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state ) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html',
  {
    scope: $scope
  }).then(function(modal)
  {
    $scope.modal = modal;
    $scope.modal.show();
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function()
  {
    $scope.modal.show();
  };

    $scope.FacebookLogin = function()
    {
       CordovaFacebook.login({
       permissions: ['email', 'user_likes'],
       onSuccess: function(result)
       {
          if(result.declined.length > 0)
          {
             alert("The User declined something!");
          }
       },
       onFailure: function(result)
       {
          if(result.cancelled)
          {
             alert("The user doesn't like my app");
          }
          else if(result.error)
          {
             alert("There was an error:" + result.errorLocalized);
          }
       }
    });

    }
  // Perform the login action when the user submits the login form
  $scope.doLogin = function()
  {
    console.log('Doing login', $scope.loginData);
    $state.go('app.home');
    $scope.closeLogin();
  };
})
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('HomeCtrl', function($scope)
{
  $scope.children = [
    { name: 'Ines', id: 1, color:"red" },
    { name: 'Norah', id: 2 , color:"#806600" },
    { name: 'Agathe', id: 3 ,color:"#9300b8"},
    { name: 'Edouard', id: 4 , color:"#37abc8"},
    { name: 'André', id: 5 , color:"#ffcc00"}
  ];
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});

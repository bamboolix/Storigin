angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $http ) {

  // Form data for the login modal
  $scope.loginData = { "action" : "authenticate" };
  $scope.registerData = { "action" : "register" };


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html',
  {
    scope: $scope
  }).then(function(modal)
  {
    $scope.modalregister = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeRegister = function()
  {
    $scope.modalregister.hide();
  };

  // Open the login modal
  $scope.openRegister = function()
  {
    $scope.modalregister.show();
  };

/**
   * Function doLogin()
   * Gestion de la connexion
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.doRegister = function()
  {
        $http.post("https://storigin.fr/storiginapi/", $scope.registerData , { headers: {'Content-Type': 'application/json'} } )
        .then(function ( response )
        {
             console.log( response.data );
        });

  };


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
  $scope.closeLogin = function()
  {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function()
  {
    $scope.modal.show();
  };

  $scope.FacebookLogin = function()
  {
      CordovaFacebook.login
      ({
       permissions: [ 'email', 'user_likes' ],
       onSuccess: function(result)
       {
          if(result.declined.length > 0)
          {
             alert("The User declined something!");
          }
       }
       ,
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

/**
   * Function doLogin()
   * Gestion de la connexion
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.doLogin = function()
  {
        $http.post("https://storigin.fr/storiginapi/", $scope.loginData , { headers: {'Content-Type': 'application/json'} } )
        .then(function ( response )
        {
               if ( response.data.status == 200 )
               {
                     $state.go( 'app.home' );
                     $scope.closeLogin();
               }
               else if ( response.data.status == 400 )
               {
                    console.log( 'erreur de connexion ');
               }
        });

  };


})
.controller('HomeCtrl', function($scope , $http )
{
    $http.post("https://storigin.fr/storiginapi/", $scope.loginData , { headers: {'Content-Type': 'application/json'} } )
    .then(function ( response )
    {
         $scope.children = response.data;
    });

});

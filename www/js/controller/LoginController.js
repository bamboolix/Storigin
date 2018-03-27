angular.module('StoriginAcademy.controllers').controller( 'LoginCtrl', function( $scope , $http, $stateParams , $ionicPopup , $rootScope, $state )
{
    $scope.loginData = { "action" : "authenticate" };
    $scope.createChildData = { "action" : "createchild" };

    // Gestion des identifiants précédement enregistrés

    if( localStorage.getItem( "password" ) && localStorage.getItem( "email") )
    {
         console.log("STORIGIN - Mot de passe trouvé");
         console.log("STORIGIN - Adresse de email trouvé");

         $scope.loginData.password = localStorage.getItem( "password" );
         $scope.loginData.email = localStorage.getItem( "email" );

         $http.post("https://storigin.fr/storiginapi/", $scope.loginData , { headers: {'Content-Type': 'application/json'} } )
                .then(function ( response )
                {
                       if ( response.data.status == 200 )
                       {
                             $scope.createChildData.parentid = response.data.parentid;
                             $rootScope.parentid = response.data.parentid;
                             if ( typeof( Storage ) !== "undefined" )
                             {
                                 localStorage.setItem("password", $scope.loginData.password );
                                 localStorage.setItem("login", $scope.loginData.email );
                             }
                             else
                             {
                                 console.log( "locationStorage non supporté" );
                             }

                             $state.go( 'app.home' );
                       }
                       else if ( response.data.status == 400 )
                       {
                             $scope.message = response.data.result;
                             openLoginPopup();
                       }
                });
    }
    else
    {
         console.log("STORIGIN - Mot de passe non trouvé");
         console.log("STORIGIN - Adresse de email non trouvé");
    }


/**
   * Function doLogin()
   * APPEL HTTP vers StoriginApi pour connexion
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.doLogin = function()
  {

        console.log( $scope.loginData );

        $http.post("https://storigin.fr/storiginapi/", $scope.loginData , { headers: {'Content-Type': 'application/json'} } )
        .then(function ( response )
        {
               if ( response.data.status == 200 )
               {
                     $scope.createChildData.parentid = response.data.parentid;
                     $rootScope.parentid = response.data.parentid;
                     if ( typeof( Storage ) !== "undefined" )
                     {
                         localStorage.setItem("password", $scope.loginData.password );
                         localStorage.setItem("email", $scope.loginData.email );
                     }
                     else
                     {
                         console.log( "locationStorage non supporté" );
                     }

                     $state.go( 'app.home' );
               }
               else if ( response.data.status == 400 )
               {
                     $scope.message = response.data.result;
                     openLoginPopup();
               }
        });
  };

/**
   * Function FacebookLogin()
   * Ouverture de la page  de login Facebook
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

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


  /**
     * Function openLoginPopup()
     * Ouverture de la fenêtre popup en cas d'erreur de login
     * @author David Namboka
     * @param {void} Aucun paramètre
     */

     var openLoginPopup = function()
     {
         LoginWarning = $ionicPopup.show
         ({
          scope: $scope,
          templateUrl : 'templates/pop-up/login-alert.html'
         });
     }

     /**
       * Function closeLoginPopup()
       * Fermeture de la fenêtre popup en cas de couleur nom non renseignée
       * @author David Namboka
       * @param {void} Aucun paramètre
       */

        $scope.closeLoginPopup = function()
        {
          LoginWarning.close();
        };



});
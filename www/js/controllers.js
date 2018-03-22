angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state,  $http, $ionicPopup, $rootScope ) {

  /*
  *
  * Définition des différents objets JSON envoyés au serveur
  * LOGIN, INSCRIPTION, CREATION
  */

  $scope.loginData = { "action" : "authenticate" };
  $scope.registerData = { "action" : "register" };
  $scope.createChildData = { "action" : "createchild" };

  /*
  *
  *  Définition des variables rivées de pop-up
  */

    var Popup;
    var ChildNameWarning;
    var ChildColorWarning;
    var BirthdayWarning;
    var RegisterWarning;
    var LoginWarning;

  $("#birthdate").val( new Date().toISOString().slice(0,10) );

/**
   * Function ionModal. Instantiation des fenêtres modal d'inscription
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $ionicModal.fromTemplateUrl('templates/register.html',
  {
    scope: $scope
  }).then(function(modal)
  {
    $scope.modalregister = modal;
  });

/**
   * Function ionModal. Instantiation des fenêtres d'information
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $ionicModal.fromTemplateUrl('templates/information.html',
  {
    scope: $scope
  }).then(function(modal)
  {
    $scope.modalinformation= modal;
  });


/**
   * Function setChildColor()
   * Gestion de la couleur de l'enfant, lors de la création de son compte
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

   $scope.setChildColor = function (color)
   {
        $scope.ChildColor = color;
        console.log(color);
        $scope.createChildData.color = color;
        $("#childcolor").css('background-color', color);
   }

/**
   * Function ionModal. Instantiation de la fenêtre de login
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $ionicModal.fromTemplateUrl('templates/login.html',
  {
    scope: $scope
  }).then( function(modal)
  {
    $scope.modal = modal;
    $scope.modal.show();
  });

/**
   * Function closeLogin()
   * Fermeture de la fenêtre modal de login
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.closeLogin = function()
  {
    $scope.modal.hide();
  };

/**
   * Function login()
   * Ouverture de la fenêtre modal de login
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.login = function()
  {
    $scope.modal.show();
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
   * Function closeRegister()
   * Fermeture de la gestion des inscriptions des parents à la Storigin Academy
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.closeRegister = function()
  {
    $scope.modalregister.hide();
  };

/**
   * Function closeRegister()
   * Ouverture de la gestion des inscriptions des parents à la Storigin Academy
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.openRegister = function()
  {
    $scope.modalregister.show();
  };


/**
   * Function openInformation()
   * Ouverture de la fenêtre modal d'information. Affichage de la version, de la beta, information sur Storigin
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.openInformation = function()
  {
    $scope.modalinformation.show();
  };


/**
   * Function closeInformation()
   * Fermeture de la fenêtre modal d'information. Affichage de la version, de la beta, information sur Storigin
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

   $scope.closeInformation = function()
   {
      $scope.modalinformation.hide();
   };


    $scope.setBirthdate = function()
    {
        var d = moment($scope.createChildData.birthdate, "MM-DD-YYYY").format("YYYY-MM-DD")
        $scope.createChildData.birthday = d;
    }
/**
   * Function doRegister()
   * Appel HTTP vers le serveur pour inscription d'un nouveau parent au service Storigin Academy
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.doRegister = function()
  {
        $http.post("https://storigin.fr/storiginapi/", $scope.registerData , { headers: {'Content-Type': 'application/json'} } )
        .then(function ( response )
        {
            if ( response.data.status == 200 )
            {

            }
            else
            {
                $scope.message = response.data.result;
                openRegisterPopup();
            }

        });
  };

/**
   * Function createChild()
   * Appel HTTP vers le serveur pour création d'un compte d'enfant
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

$scope.createChild = function()
{
   $http.post("https://storigin.fr/storiginapi/", $scope.createChildData , { headers: {'Content-Type': 'application/json'} } )
   .then(function ( response )
   {
       if ( response.data.status == 200 )
       {
             $scope.createChildData.parentid = response.data.parentid;
             $state.go( 'app.home' );
             $scope.closeLogin();
       }
       else if( response.data.status == 201 )
       {
            $scope.message = response.data.result;
            openPopup();
       }
       else if ( response.data.status == 400 )
       {
       }
       else if ( response.data.status == 401 )
       {
             $scope.message = response.data.result;
             openChildNameWarningPopup();
       }
       else if ( response.data.status == 402 )
       {
           $scope.message = response.data.result;
           openBirthdayWarningPopup();
       }
       else if ( response.data.status == 403 )
       {
           $scope.message = response.data.result;
           openChildColorWarningPopup();
       }
   });
 };

  // Perform the login action when the user submits the login form

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
                     $state.go( 'app.home' );
                     $scope.closeLogin();
               }
               else if ( response.data.status == 400 )
               {
                     openLoginPopup();
               }
        });
  };


/**
   * Function openPopup()
   * Ouverture de la fenêtre popup de prévention 3-6-9-12
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  var openPopup = function()
  {
      Popup = $ionicPopup.show
      ({
       scope: $scope,
       templateUrl : 'templates/warning.html'
      });
  }

/**
   * Function closePopup()
   * Fermeture de la fenêtre popup de prévention 3-6-9-12
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.closePopup = function()
  {
    Popup.close();
  };

/**
   * Function openBirthdayWarningPopup()
   * Ouverture de la fenêtre popup en cas de date d'anniversaire non renseignée
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

   var openBirthdayWarningPopup = function()
   {
        BirthdayWarning = $ionicPopup.show
        ({
         scope: $scope,
         templateUrl : 'templates/pop-up/birthday-warning.html'
        });
   }

/**
   * Function closeBirthdayWarningPopup()
   * Fermeture de la fenêtre popup en cas de date d'anniversaire non renseignée
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

   $scope.closeBirthdayWarningPopup = function()
   {
      BirthdayWarning.close();
   };

/**
   * Function closeBirthdayWarningPopup()
   * Ouverture de la fenêtre popup en cas de nom non renseignée
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

    var openChildNameWarningPopup = function()
    {
        ChildNameWarning = $ionicPopup.show
        ({
         scope: $scope,
         templateUrl : 'templates/pop-up/childname-warning.html'
        });
    }

/**
   * Function closeBirthdayWarningPopup()
   * Fermeture de la fenêtre popup en cas de nom non renseignée
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

    $scope.closeChildNameWarningPopup = function()
    {
      ChildNameWarning.close();
    };

/**
  * Function openChildColorWarningPopup()
  * Ouverture de la fenêtre popup en cas de couleur nom non renseignée
  * @author David Namboka
  * @param {void} Aucun paramètre
  */

   var openChildColorWarningPopup = function()
   {
       ChildColorWarning = $ionicPopup.show
       ({
        scope: $scope,
        templateUrl : 'templates/pop-up/childcolor-warning.html'
       });
   }


/**
  * Function closeColorWarningPopup()
  * Fermeture de la fenêtre popup en cas de couleur nom non renseignée
  * @author David Namboka
  * @param {void} Aucun paramètre
  */

   $scope.closeColorWarningPopup = function()
   {
     ChildColorWarning.close();
   };

/**
  * Function openRegisterPopup()
  * Ouverture de la fenêtre popup en cas de couleur nom non renseignée
  * @author David Namboka
  * @param {void} Aucun paramètre
  */

   var openRegisterPopup = function()
   {
       RegisterWarning = $ionicPopup.show
       ({
        scope: $scope,
        templateUrl : 'templates/pop-up/register-alert.html'
       });
   }

   /**
     * Function closeRegisterPopup()
     * Fermeture de la fenêtre popup en cas de couleur nom non renseignée
     * @author David Namboka
     * @param {void} Aucun paramètre
     */

      $scope.closeRegisterPopup = function()
      {
        RegisterWarning.close();
      };

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

})
.controller( 'HomeCtrl', function( $scope , $http, $stateParams , $rootScope )
{
    $http.post("https://storigin.fr/storiginapi/", { action: 'getChildren' , parentid : $rootScope.parentid } , { headers: {'Content-Type': 'application/json'} } )
    .then(function ( response )
    {
         console.log(response);
         $scope.children = response.data.result;
    });
})

.controller('ChildDetailCtrl', function($scope)
{

});;

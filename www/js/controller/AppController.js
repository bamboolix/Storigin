angular.module('StoriginAcademy.controllers').controller('AppCtrl', function($scope, $ionicModal, $timeout, $state,  $http, $ionicPopup, $rootScope ) {

  /*
  * VARIABLES au sens propriétés du controleur
  * Définition des différents objets JSON envoyés au serveur
  * LOGIN, INSCRIPTION, CREATION
  */

    $scope.registerData = { "action" : "register" };
    $scope.createChildData = { "action" : "createchild" };
    $scope.createChildData.parentid = $rootScope.parentid;
    var Popup;

  /*
  *  VARIABLES au sens fonctions Javascript
  */

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
    $scope.createChildData.parentid = $rootScope.parentid;
    console.log( "scope = " + $scope.createChildData.parentid );
    console.log( "rootScope = " + $rootScope.parentid );


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
             $scope.message = response.data.result;
             openChildNameWarningPopup();
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
       else if ( response.data.status == 404 )
       {
           $scope.message = response.data.result;
           openChildColorWarningPopup();
       }

      else if ( response.data.status == 403 )
      {
          $scope.message = response.data.result;
          openErrorOccuredWarningPopup();
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

   var openErrorOccuredWarningPopup = function()
   {
       ErrorOccuredWarning = $ionicPopup.show
       ({
        scope: $scope,
        templateUrl : 'templates/pop-up/error-occured-warning.html'
       });
   }



/**
  * Function closeColorWarningPopup()
  * Fermeture de la fenêtre popup en cas de couleur nom non renseignée
  * @author David Namboka
  * @param {void} Aucun paramètre
  */

   $scope.closeErrorOccuredWarningPopup = function()
   {
     ErrorOccuredWarning.close();
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


});
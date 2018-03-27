angular.module('StoriginAcademy.controllers').controller( 'ParentsCtrl', function( $scope , $http, $stateParams , $timeout, $rootScope , $ionicPopup )
{

  /*
  *
  * Définition des différents objets JSON envoyés au serveur
  * INVITE
  */

  $scope.InviteData = { "action" : "inviteParent" };
  var InvitationWarning;


  $scope.InviteData.parentid = $rootScope.parentid;
/**
   * Function InviteParents()
   * APPEL HTTP vers StoriginApi pour connexion
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.InviteParents = function()
  {
        console.log( $scope.InviteData );
        $http.post("https://storigin.fr/storiginapi/", $scope.InviteData , { headers: {'Content-Type': 'application/json'} } )
        .then(function ( response )
        {
               if ( response.data.status == 200 )
               {
                     $scope.message = response.data.result;
                     openInvitationSuccessPopup();
               }
               else if ( response.data.status == 400 )
               {
                     $scope.message = response.data.result;
                     openInvitationWarningPopup();
               }
        });
  };

  /**
     * Function closeBirthdayWarningPopup()
     * Ouverture de la fenêtre popup en cas de nom non renseignée
     * @author David Namboka
     * @param {void} Aucun paramètre
     */

      var openInvitationSuccessPopup = function()
      {
          InvitationSuccess = $ionicPopup.show
          ({
           scope: $scope,
           templateUrl : 'templates/pop-up/invite-success.html'
          });
      }

  /**
     * Function closeBirthdayWarningPopup()
     * Fermeture de la fenêtre popup en cas de nom non renseignée
     * @author David Namboka
     * @param {void} Aucun paramètre
     */

      $scope.closeInvitationSuccessPopup = function()
      {
        InvitationSuccess.close();
      };

  /**
     * Function closeBirthdayWarningPopup()
     * Ouverture de la fenêtre popup en cas de nom non renseignée
     * @author David Namboka
     * @param {void} Aucun paramètre
     */

      var openInvitationWarningPopup = function()
      {
          InvitationWarning = $ionicPopup.show
          ({
           scope: $scope,
           templateUrl : 'templates/pop-up/invite-warning.html'
          });
      }

  /**
     * Function closeBirthdayWarningPopup()
     * Fermeture de la fenêtre popup en cas de nom non renseignée
     * @author David Namboka
     * @param {void} Aucun paramètre
     */

      $scope.closeInvitationWarningPopup = function()
      {
        InvitationWarning.close();
      };

});
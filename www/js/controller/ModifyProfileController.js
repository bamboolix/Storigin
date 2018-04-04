angular.module('StoriginAcademy.controllers').controller( 'ModifyProfileCtrl', function( $scope , $http, $stateParams , $rootScope, $state )
{
  $scope.updateData = { action : "updateProfile" }
  $scope.updateData.parentid = $rootScope.parentid;
  $scope.updateData.parentnom = $rootScope.parentnom;
  $scope.updateData.parentprenom = $rootScope.parentprenom;
  $scope.updateData.password = $rootScope.password;
  $scope.updateData.email = $rootScope.email;

  /**
     * Function doRegister()
     * Appel HTTP vers le serveur pour inscription d'un nouveau parent au service Storigin Academy
     * @author David Namboka
     * @param {void} Aucun paramètre
     */

    $scope.doUpdate = function()
    {
          $http.post("https://storigin.fr/storiginapi/", $scope.updateData , { headers: {'Content-Type': 'application/json'} } )
          .then(function ( response )
          {
              if ( response.data.status == 200 )
              {
                console.log(response.data.result);
              }
              else
              {
                  $scope.message = response.data.result;
                  openRegisterPopup();
              }
          });
    };

 });

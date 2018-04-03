angular.module('StoriginAcademy.controllers').controller( 'ModifyChildCtrl', function( $scope , $http, $stateParams , $rootScope, $state )
{
  $scope.updateChildData = { action:'updatechild}' };

  $scope.updateChildData.childid = $stateParams.childid;

    $http.post("https://storigin.fr/storiginapi/", $scope.updateChildData , { headers: {'Content-Type': 'application/json'} } )
    .then(function ( response ){
        if (reponse.date.status=200)
        {
            $scope.updateChildData = reponse.data.result;
        }
      });

   $scope.setmodifyChildColor = function (color)
   {
        $scope.modifyChildColor = color;
        console.log(color);
        $scope.updateChildData.color = color;
        $("#childcolor").css('background-color', color);
   };
  })

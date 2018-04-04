angular.module('StoriginAcademy.controllers').controller( 'ModifyChildCtrl', function( $scope , $http, $stateParams , $rootScope, $state )
{

  $scope.updateChildData = { action:'updatechild}' };

  $scope.updateChildData.childid = $stateParams.childid;

    $http.post("https://storigin.fr/storiginapi/", $scope.updateChildData , { headers: {'Content-Type': 'application/json'} } )
    .then(function ( response ){
        if ( response.data.status == 200 )
        {
            $scope.updateChildData = response.data.result;
        }
   });

   $scope.setModifyChildColor = function (color)
   {
        $scope.modifyChildColor = color;
        $scope.updateChildData.color = color;
        $( "#modifyChildColor" ).css('background-color', color);
   };
  })

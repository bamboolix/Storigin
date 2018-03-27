angular.module('StoriginAcademy.controllers').controller( 'HomeCtrl', function( $scope , $http, $stateParams , $rootScope, $state )
{
    $http.post("https://storigin.fr/storiginapi/", { action: 'getChildren' , parentid : $rootScope.parentid } , { headers: {'Content-Type': 'application/json'} } )
    .then(function ( response )
    {
         console.log(response);
         $scope.children = response.data.result;
    });

    $scope.GetChildDetail = function( childid, childcolor, pseudo, age )
    {
        // console.log({ detailedchildid : childid, detailedchildcolor : childcolor , detailedchildpseudo : pseudo , detailedchildage : age });
        $state.go( 'app.childdetail', { detailedchildid : childid, detailedchildcolor : childcolor , detailedchildpseudo : pseudo , detailedchildage : age } );
    }
});
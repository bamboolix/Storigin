angular.module('StoriginAcademy.controllers').controller( 'HomeCtrl', function( $scope , $http, $stateParams , $rootScope, $state )
{
    $http.post("https://storigin.fr/storiginapi/", { action: 'getChildren' , parentid : $rootScope.parentid } , { headers: {'Content-Type': 'application/json'} } )
    .then(function ( response )
    {
         console.log(response.data.result);
         $scope.children = response.data.result;
    });



    $scope.GetStarsLevel = function ( level )
     {
        var starsLevel = { star1 : true, star2 : true, star3 : true, star4:false };

        switch ( level )
        {
            case "star1":
               return starsLevel.star1 ? 'active-item icon ion-android-star' : 'inactive-item icon ion-android-star';
            break;
            case "star2":
                return starsLevel.star2 ? 'active-item icon ion-android-star' : 'inactive-item icon ion-android-star';
            break;
            case "star3":
                return starsLevel.star3 ? 'active-item icon ion-android-star' : 'inactive-item icon ion-android-star';
            break;
            case "star4":
                return starsLevel.star4 ? 'active-item icon ion-android-star' : 'inactive-item icon ion-android-star';
            break;
        }
     };


         $scope.GetHeartsLevel = function ( level )
          {
             var heartsLevel = { heart1 : true, heart2 : true, heart3 : true, heart4:false };

             switch ( level )
             {
                 case "heart1":
                    return heartsLevel.heart1 ? 'active-item icon ion-heart' : 'inactive-item icon ion-heart';
                 break;
                 case "heart2":
                     return heartsLevel.heart2 ? 'active-item icon ion-heart' : 'inactive-item icon ion-heart';
                 break;
                 case "heart3":
                     return heartsLevel.heart3 ? 'active-item icon ion-heart' : 'inactive-item icon ion-heart';
                 break;
                 case "heart4":
                     return heartsLevel.heart4 ? 'active-item icon ion-heart' : 'inactive-item icon ion-heart';
                 break;
             }
          };


    $scope.GetChildDetail = function( childid, childcolor, pseudo, age )
    {
        // console.log({ detailedchildid : childid, detailedchildcolor : childcolor , detailedchildpseudo : pseudo , detailedchildage : age });
        $state.go( 'app.childdetail', { detailedchildid : childid, detailedchildcolor : childcolor , detailedchildpseudo : pseudo , detailedchildage : age } );
    }
});
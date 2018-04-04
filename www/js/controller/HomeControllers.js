angular.module('StoriginAcademy.controllers').controller( 'HomeCtrl', function( $timeout, $scope , $http, $stateParams , $rootScope, $state, $ionicPopover, $ionicPopup )
{

    // Si le cookie firstConnexion n'est pas présent on va à l'aide à l'utilisation

    if( !localStorage.getItem( "firstConnexion" )  )
    {
          $state.go( 'app.firstConnexion' );
    }

   var HomeWarning;

  /**
    * Function openHomeMessagePopup()
    * Ouverture de la fenêtre popup en cas de couleur nom non renseignée
    * @author David Namboka
    * @param {void} Aucun paramètre
    */

    var openHomeMessagePopup = function()
    {
       HomeWarning = $ionicPopup.show
       ({
        scope: $scope,
        templateUrl : 'templates/pop-up/home-message.html'
       });


        $http.post("https://storigin.fr/storiginapi/", { action: 'getChildren' , parentid : $rootScope.parentid } , { headers: {'Content-Type': 'application/json'} } )
        .then(function ( response )
        {
             $scope.children = response.data.result;
        });

        $timeout(closeHomeMessagePopup, 2000);
    }

   /**
     * Function closeHomeMessagePopup()
     * Fermeture de la fenêtre popup en cas de couleur nom non renseignée
     * @author David Namboka
     * @param {void} Aucun paramètre
     */

      var closeHomeMessagePopup = function()
      {
        HomeWarning.close();
      };

  /**
     * Function DeleteAccount. Instantiation des fenêtres d'information
     * @author David Namboka
     * @param {int} childid entier représentant l'identifiant de l'enfant en base
     */

    $scope.DeleteAccount = function( childid )
    {
          $http.post("https://storigin.fr/storiginapi/", { action: 'DeleteChild' , childid : childid } , { headers: {'Content-Type': 'application/json'} } )
          .then(function ( response )
          {
               $scope.message = response.data.result;
               openHomeMessagePopup();
          });
    }

    $http.post("https://storigin.fr/storiginapi/", { action: 'getChildren' , parentid : $rootScope.parentid } , { headers: {'Content-Type': 'application/json'} } )
    .then(function ( response )
    {
         console.log(response.data.result);
         $scope.children = response.data.result;
    });


/**
   * Function GetStarsLevel()
   * Ouverture de la page  de login Facebook
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

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

/**
   * Function GetHeartsLevel()
   * Ouverture de la page  de login Facebook
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

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


/**
   * Function GetChildDetail()
   * Ouverture de la page  de login Facebook
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

    $scope.GetChildDetail = function( childid, childcolor, pseudo, age )
    {
        // console.log({ detailedchildid : childid, detailedchildcolor : childcolor , detailedchildpseudo : pseudo , detailedchildage : age });
        $state.go( 'app.childdetail', { detailedchildid : childid, detailedchildcolor : childcolor , detailedchildpseudo : pseudo , detailedchildage : age } );
    }


   //Cleanup the popover when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.popover.remove();
   });

   // Execute action on hide popover
   $scope.$on('popover.hidden', function() {
      // Execute action
   });

   // Execute action on remove popover
   $scope.$on('popover.removed', function() {
      // Execute action
   });

   $scope.$on('updateHomeListEvent', function(event, args)
   {

        $http.post("https://storigin.fr/storiginapi/", { action: 'getChildren' , parentid : $rootScope.parentid } , { headers: {'Content-Type': 'application/json'} } )
        .then(function ( response )
        {
             $scope.children = response.data.result;
        });
        console.log( "Storigin : mise à jour de la liste des enfants" );
   });

});
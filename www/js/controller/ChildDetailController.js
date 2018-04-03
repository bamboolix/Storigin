
angular.module('StoriginAcademy.controllers').controller('ChildDetailCtrl', function($scope, $state, $ionicPopup, $stateParams , $http, $rootScope )
{


  var PlayTimer = new Timer();

  PlayTimer.start();
  PlayTimer.addEventListener('secondsUpdated', function ( e )
  {
        $('#PlayeTimer').html(PlayTimer.getTimeValues().toString());
  });

  $scope.calendarData = { "action" : "childCalendar" };
  $scope.ChildData = { "action" : "getChildDetails" };
  $scope.GetChildCalendar = { "action" : "GetChildCalendar" };
  $scope.GetChildCalendar.childid = parseInt($stateParams.detailedchildid);
  $scope.ChildData.parentid = $rootScope.parentid;

  $scope.childid = $stateParams.detailedchildid;
  $scope.color = $stateParams.detailedchildcolor;
  $scope.pseudo = $stateParams.detailedchildpseudo;
  $scope.age = $stateParams.detailedchildage;
  $scope.conseils = "X h / jour";
  $scope.attention = "l'identité numérique";

/*  $scope.calendarData.monday = true;
  $scope.calendarData.tuesday = true;
*/

  $http.post("https://storigin.fr/storiginapi/",  $scope.GetChildCalendar , { headers: {'Content-Type': 'application/json'} } )
  .then(function ( response )
  {
       $scope.calendarData.monday = Boolean(response.data.result[0].lundi);
       $scope.calendarData.tuesday = Boolean(response.data.result[0].mardi);
       $scope.calendarData.wednesday = Boolean(response.data.result[0].mercredi);
       $scope.calendarData.thursday = Boolean(response.data.result[0].jeudi);
       $scope.calendarData.friday = Boolean(response.data.result[0].vendredi);
       $scope.calendarData.saturday = Boolean(response.data.result[0].samedi);
       $scope.calendarData.sunday = Boolean(response.data.result[0].dimanche);
  });
/**
   * Function openPopup()
   * Ouverture de la fenêtre popup générique
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.SetStoriginGamingCalendar = function()
  {
    openPopup();
  }

/**
   * Function openPopup()
   * Ouverture de la fenêtre popup générique
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  var openPopup = function()
  {
      Popup = $ionicPopup.show
      ({
       scope: $scope,
       templateUrl : 'templates/pop-up/gaming-calendar.html'
      });
  }

/**
   * Function closePopup()
   * Fermeture de la fenêtre popup générique
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.closePopup = function()
  {
    Popup.close();
  };

/**
   * Function SetChildCalendar()
   * Fermeture de la fenêtre popup générique
   * @author David Namboka
   * @param {void} Aucun paramètre
   */

  $scope.SetChildCalendar = function()
  {
    $scope.calendarData.childid =  parseInt( $scope.childid );

    if ($scope.calendarData.monday == undefined)
    {
        $scope.calendarData.monday = false;
    }
    if ($scope.calendarData.tuesday == undefined)
    {
        $scope.calendarData.tuesday = false;
    }
    if ($scope.calendarData.wednesday == undefined)
    {
        $scope.calendarData.wednesday = false;
    }
    if ($scope.calendarData.thursday == undefined)
    {
        $scope.calendarData.thursday = false;
    }
    if ($scope.calendarData.friday == undefined)
    {
        $scope.calendarData.friday = false;
    }
    if ($scope.calendarData.saturday == undefined)
    {
        $scope.calendarData.saturday = false;
    }
    if ($scope.calendarData.sunday == undefined)
    {
        $scope.calendarData.sunday = false;
    }

    $http.post("https://storigin.fr/storiginapi/", $scope.calendarData , { headers: {'Content-Type': 'application/json'} } )
    .then(function ( response )
    {
         console.log(response);
         $scope.children = response.data.result;
    });
    Popup.close();
  }


   /**
     * Function showmodifychild()
     * Ouverture de la vue pour modifier l'enfant
     * @author Florian Farcy
     * @param {void} Aucun paramètre
     */

    $scope.showmodifychild = function()
    {
      $state.go( 'app.modify-child')
    };
});

angular.module('StoriginAcademy.controllers').controller('ChildDetailCtrl', function($scope, $ionicPopup, $stateParams , $http, $rootScope )
{

  $scope.calendarData = { "action" : "childCalendar" };
  $scope.ChildData = { "action" : "getChildDetails" };

  $scope.ChildData.parentid = $rootScope.parentid;

  $scope.childid = $stateParams.detailedchildid;
  $scope.color = $stateParams.detailedchildcolor;
  $scope.pseudo = $stateParams.detailedchildpseudo;
  $scope.age = $stateParams.detailedchildage;

  console.log( $stateParams );

  //$http.get();

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
});
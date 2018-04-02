// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'StoriginAcademy' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'StoriginAcademy.controllers' is found in controllers.js

angular.module('StoriginAcademy', ['ionic', 'StoriginAcademy.controllers'])

.run(function($ionicPlatform)
{
  $ionicPlatform.ready(function()
  {
    document.addEventListener("deviceready", onDeviceReady, false);

      function onDeviceReady()
      {
        AndroidFullScreen.immersiveMode(successFunction, errorFunction);
      }

      function successFunction()
      {
          console.info("mode plein écran activé pour Android");
      }

      function errorFunction(error)
      {
          console.error(error);
      }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard)
    {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar)
    {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state
  ('app',
     {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
     }
  )
  .state('app.firstConnexion',
      {
        url: '/firstConnexion',
        views: {
          'menuContent':
          {
            templateUrl: 'templates/firstConnexion.html',
            controller: 'FirstConnexionCtrl'
          }
        }
  })
  .state('app.parents',
  {
    url: '/parents',
    views:
    {
      'menuContent':
       {
        templateUrl: 'templates/parents.html',
        controller: 'ParentsCtrl'
      }
    }
  })
  .state('app.login',
      {
        url: '/login',
        views: {
          'menuContent':
          {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
  .state('app.home',
    {
      url: '/home',
      views: {
        'menuContent':
        {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.childdetail',
    {
    // DAVN définition des paramètres de l'URL via un QueryParameter : https://github.com/angular-ui/ui-router/wiki/URL-Routing
      url: '/childdetail?detailedchildid&detailedchildcolor&detailedchildpseudo?detailedchildage',
      views: {
        'menuContent': {
          templateUrl: 'templates/childdetail.html',
          controller: 'ChildDetailCtrl'
        }
      }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

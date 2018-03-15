// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform)
{
  $ionicPlatform.ready(function()
  {
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
    function successFunction()
    {
        console.info("It worked!");
    }

    function errorFunction(error)
    {
        console.error(error);
    }

    function trace(value)
    {
        console.log(value);
    }
// Hide system UI until user interacts
AndroidFullScreen.leanMode(successFunction, errorFunction);

// Show system UI
AndroidFullScreen.showSystemUI(successFunction, errorFunction);

// Extend your app underneath the status bar (Android 4.4+ only)
AndroidFullScreen.showUnderStatusBar(successFunction, errorFunction);

// Extend your app underneath the system UI (Android 4.4+ only)
AndroidFullScreen.showUnderSystemUI(successFunction, errorFunction);

// Hide system UI and keep it hidden (Android 4.4+ only)
AndroidFullScreen.immersiveMode(successFunction, errorFunction);

// Custom full screen mode
// See https://developer.android.com/reference/android/view/View.html#setSystemUiVisibility(int)
AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_FULLSCREEN | AndroidFullScreen.SYSTEM_UI_FLAG_LOW_PROFILE, successFunction, errorFunction);
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

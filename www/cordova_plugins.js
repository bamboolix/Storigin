cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-fullscreen.AndroidFullScreen",
    "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
    "pluginId": "cordova-plugin-fullscreen",
    "clobbers": [
      "AndroidFullScreen"
    ]
  },
  {
    "id": "cordova-plugin-facebook.CordovaFacebook",
    "file": "plugins/cordova-plugin-facebook/www/CordovaFacebook.js",
    "pluginId": "cordova-plugin-facebook",
    "clobbers": [
      "CordovaFacebook"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  },
  {
    "id": "phonegap-nfc.NFC",
    "file": "plugins/phonegap-nfc/www/phonegap-nfc.js",
    "pluginId": "phonegap-nfc",
    "runs": true
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-device": "2.0.1",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-ionic-webview": "1.1.16",
  "cordova-plugin-fullscreen": "1.1.0",
  "cordova-plugin-facebook": "0.2.2",
  "cordova-plugin-ionic-keyboard": "2.0.5",
  "phonegap-nfc": "0.7.1"
};
// BOTTOM OF METADATA
});
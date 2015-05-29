/*cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [];
    
});*/

cordova.define('cordova/plugin_list', function (require, exports, module) {
     
   /* var exec = require('cordova/exec'),
    screenOrientation = {},
    iosOrientation = 'unlocked',
    orientationMap = {
        'portrait': [0, 180],
        'portrait-primary': [0],
        'portrait-secondary': [180],
        'landscape': [-90, 90],
        'landscape-primary': [-90],
        'landscape-secondary': [90],
        'default': [-90, 90, 0]
    };

    screenOrientation.setOrientation = function (orientation) {
        iosOrientation = orientation;

        var success = function (res) {
            if (orientation === 'unlocked' && res.device) {
                iosOrientation = res.device;
                setTimeout(function () {
                    iosOrientation = 'unlocked';
                }, 300);
            }
        };

        exec(success, null, "YoikScreenOrientation", "screenOrientation", ['set', orientation]);
    };

    module.exports = screenOrientation;

    // ios orientation callback/hook
    window.shouldRotateToOrientation = function (orientation) {
        var map = orientationMap[iosOrientation] || orientationMap['default'];
        return map.indexOf(orientation) >= 0;
    };*/
    
    var screenOrientation = {},
         iosOrientation = 'unlocked',
    orientationMap = {
        'portrait': [0, 180],
        'portrait-primary': [0],
        'portrait-secondary': [180],
        'landscape': [-90, 90],
        'landscape-primary': [-90],
        'landscape-secondary': [90],
        'default': [-90, 90, 0]
    },
    Orientations = [
        'portrait-primary',
        // The orientation is in the primary portrait mode.
        'portrait-secondary',
        // The orientation is in the secondary portrait mode.
        'landscape-primary',
        // The orientation is in the primary landscape mode.
        'landscape-secondary',
        // The orientation is in the secondary landscape mode.
        'portrait',
        // The orientation is either portrait-primary or portrait-secondary.
        'landscape'
        // The orientation is either landscape-primary or landscape-secondary.
    ];

    screenOrientation.Orientations = Orientations;
    screenOrientation.currOrientation = 'unlocked';

    screenOrientation.setOrientation = function (orientation) {
        //platform specific files override this function
        
        iosOrientation = orientation;

        var success = function (res) {
            if (orientation === 'unlocked' && res.device) {
                iosOrientation = res.device;
                setTimeout(function () {
                    iosOrientation = 'unlocked';
                }, 300);
            }
        };

        cordova.exec(success, null, "YoikScreenOrientation", "screenOrientation", ['set', orientation]);
        

        console.log('setOrientation not supported on device');
    };

    function addScreenOrientationApi(obj) {
        if (obj.unlockOrientation || obj.lockOrientation) {
            return;
        }

        obj.lockOrientation = function (orientation) {
            if (Orientations.indexOf(orientation) == -1) {
                console.log('INVALID ORIENTATION', orientation);
                return;
            }
            screenOrientation.currOrientation = orientation;
            screenOrientation.setOrientation(orientation);
        };

        obj.unlockOrientation = function () {
            screenOrientation.currOrientation = 'unlocked';
            screenOrientation.setOrientation('unlocked');
        };
    }

    addScreenOrientationApi(screen);
    orientationChange();

    function orientationChange() {
        alert("orientation change");
        var orientation;

        switch (window.orientation) {
            case 0:
                orientation = 'portrait-primary';
                break;
            case 90:
                orientation = 'landscape-secondary';
                break;
            case 180:
                orientation = 'portrait-secondary';
                break;
            case -90:
                orientation = 'landscape-primary';
                break;
            default:
                orientation = 'unknown';
        }

        screen.orientation = orientation;
    }

    window.addEventListener("orientationchange", orientationChange, true);

    module.exports = screenOrientation;
    
});
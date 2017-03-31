(function(window) {
    'use strict';
    var App = window.App || {};
    var isAlreadyPresent;
    var Validation = {
        isCompanyEmail: function(email, remoteDS) {
            if (/.+@bignerdranch\.com$/.test(email)) {
                remoteDS.get(email, function(r) {
                    if (r != "" && r != null) {
                        isAlreadyPresent = 'yes';
                    } else {
                        isAlreadyPresent = 'no';
                    }
                });
                return isAlreadyPresent;
            } else {
                return false;
            }
        },
        // isAlreadyPresent: function(email,remoteDS){
        //   remoteDS.get(email,function(r){
        //     if(r="" && r!=null){
        //       isAlreadyPresent = true;
        //     }
        //     else {
        //       isAlreadyPresent = false;
        //     }
        //   });
        //   return isAlreadyPresent;
        // },
        isDecafandGreater: function(order, strength) {
            //var regex = /^decaf$/;
            if (order.includes('decaf') && strength > 20) {
                return false;
            }
            return true;
        }
    };
    App.Validation = Validation;
    window.App = App;
})(window);

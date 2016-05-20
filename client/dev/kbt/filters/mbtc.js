;
(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact').
  filter('mbtc', function() {
    return function(number) {
      if (isNaN(number)) {
        return number;
      } else {
        var mbtc = number / 100000;
        return mbtc + ' mBTC';
      }
    }
  });
}(window.angular));

;(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .config([
      '$locationProvider',
      function($locationProvider) {
        $locationProvider.html5Mode(true);
      }
    ]);
}(window.angular));

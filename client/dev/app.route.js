;(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'kbt/templates/kbt.html',
            controller: 'TransactionController',
            // controllerAs: 'TransactionController'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
}(window.angular));

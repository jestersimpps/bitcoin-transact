;
(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .factory('TransactionResource', [
      '$resource',
      function($resource) {
        var _url = '/api/wallet';
        return $resource(_url);
      }
    ]);

}(window.angular));

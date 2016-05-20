;
(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .factory('TransactionService', [
      '$q',
      'Transaction',
      'TransactionResource',
      function($q, Transaction, TransactionResource) {
        var TS = function() {};

        TS.prototype.getBalance = function(address) {
          var _onSuccess = function(data) {
            return data;
          };

          var _onError = function(error) {
            return $q.reject(error);
          };
          console.log('service:' + address);


          return TransactionResource
            .get({pub_key:address})
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        TS.prototype.createTransaction = function(transaction) {
          // if (!ng.isObject(transaction) || !(transaction instanceof Transaction) || !transaction.isValid()) {
          //   return $q.reject(new TypeError('Invalid transaction.'));
          // }

          var _onSuccess = function(data) {
            return new Transaction(data);
          };

          var _onError = function(error) {
            return $q.reject(error);
          };

          return TransactionResource
            .save(transaction)
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };


        return new TS();
      }
    ]);

}(window.angular));

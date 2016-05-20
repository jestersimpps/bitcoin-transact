;
(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .controller('TransactionController', [
      '$scope',
      'Transaction',
      'TransactionService',
      function($scope, Transaction, TransactionService) {

        $scope.transaction = new Transaction();
        $scope.origin = [];
        $scope.recipient = [];
        $scope.recipientOk = false;
        $scope.originOk = false;

        $scope.createTransaction = function(transaction) {
          TransactionService
            .createTransaction(transaction)
            .then(function(newTransaction) {
              // $scope.transactions.push(newTransaction);
              console.log(newTransaction);
            })
            .catch(function(error) {
              console.log(error);
            });
        };

        $scope.getOriginHistory = function(fromAddress) {
          $scope.origin = [];
          TransactionService
            .getBalance(fromAddress)
            .then(function(balance) {
              $scope.origin = balance;
              $scope.originOk = true;
              console.log(balance);
            })
            .catch(function(error) {
              $scope.originOk = false;
              console.log(error);
            });
        };

        $scope.getRecipientHistory = function(toAddress) {
          $scope.recipient = [];
          TransactionService
            .getBalance(toAddress)
            .then(function(balance) {
              $scope.recipient = balance;
              $scope.recipientOk = true;
              console.log(balance);
            })
            .catch(function(error) {
              $scope.recipientOk = false;
              console.log(error);
            });
        };


      }
    ]);
}(window.angular));

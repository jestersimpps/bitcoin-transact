;
(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .controller('TransactionController', [
      '$scope',
      'Transaction',
      'TransactionService',
      'toaster',
      function($scope, Transaction, TransactionService, toaster) {

        $scope.transaction = new Transaction();
        $scope.origin = [];
        $scope.recipient = [];
        $scope.recipientOk = false;
        $scope.originOk = false;

        $scope.createTransaction = function(transaction) {
          var $btn = $('#submitBtn').button('loading');
          TransactionService
            .createTransaction(transaction)
            .then(function(newTransaction) {
              // $scope.transactions.push(newTransaction);
              toaster.pop('success', "Transaction succeeded", "transaction ID: " + newTransaction.transactionId);
              $btn.button('reset')
              console.log(newTransaction);
            })
            .catch(function(error) {
              console.log(error);
              toaster.pop('error', "Transaction error", error.data);
              $btn.button('reset')
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
              toaster.pop('error', "Origin address verification error", error.data);
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
              toaster.pop('error', "Recipient address verification error", error.data);
              console.log(error);
            });
        };


      }
    ]);
}(window.angular));

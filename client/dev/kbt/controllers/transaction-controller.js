;
(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .controller('TransactionController', [
      '$scope',
      'Transaction',
      'TransactionService',
      'toaster',
      function($scope, Transaction, TransactionService,toaster) {

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
               toaster.pop('error', "Transaction error", error.data);
            });
        };

        $scope.getOriginHistory = function(fromAddress) {
          $scope.origin = [];
          TransactionService
            .getBalance(fromAddress)
            .then(function(balance) {
              $scope.origin = balance;
              $scope.originOk = true;
              toaster.pop('success', "Verification success", 'Origin address verified');
              console.log(balance);
            })
            .catch(function(error) {
              $scope.originOk = false;
              toaster.pop('error', "Verification error", error.data);
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
              toaster.pop('success', "Verification success", 'Recipient address verified');
              console.log(balance);
            })
            .catch(function(error) {
              $scope.recipientOk = false;
              toaster.pop('error', "Verification error", error.data);
              console.log(error);
            });
        };


      }
    ]);
}(window.angular));

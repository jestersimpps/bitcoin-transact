;
(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .factory('Transaction', [function() {

      var Transaction = function(transaction) {
        var self = this;
        self.fromaddress = '1LMrshuK8GdJjukVrrbWkT9FUi4aCTvATe';
        self.toaddress = '15CrPRVdNUaXX1DCZqttnP21wyJLTTmy8y';
        self.privatekey = '3iQUEupVox3hUbn5Q577umvu8Z2zmn4gKW1YJx6TxJsN';
        self.amount = 0.007;
        ng.extend(self, transaction);
        return self;
      };

      var MIN_ACCEPTED_LENGTH = 5;
      var MININGFEE = 0.00667;
      var BITCOINADDRESS = '(?:[13][1-9A-Za-z][^O0Il]{24,32})';
      var PRIVATEKEY = '([1-9A-Za-z][^OIl]){20,50}';

      Transaction.prototype.isValid = function() {

        var _hasOrigin = ng.isDefined(this.fromaddress) && ng.isString(this.fromaddress);
        var _hasRecipient = ng.isDefined(this.toaddress) && ng.isString(this.toaddress);
        var _hasPrivateKey = ng.isDefined(this.privatekey) && ng.isString(this.privatekey);
        var _hasAmount = ng.isDefined(this.amount) && ng.isString(this.amount);


        var _originIsAddress = _hasOrigin ? this.fromaddress.match(BITCOINADDRESS) : false;
        var _recipientIsAddress = _hasRecipient ? this.toaddress.match(BITCOINADDRESS) : false;
        var _hasPrivateKey = _hasPrivateKey ? this.privatekey.match(PRIVATEKEY) : false;
        var _amountCoversFee = _hasAmount ? this.amount > MININGFEE : false;

        return _hasOrigin && _hasRecipient && _hasPrivateKey && _hasAmount && _originIsAddress && _recipientIsAddress && _hasPrivateKey && _amountCoversFee;
      };

      return Transaction;
    }]);

}(window.angular));

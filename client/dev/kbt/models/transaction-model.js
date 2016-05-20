;(function(ng) {
  'use strict';

  ng.module('kunstmaan-bitcoin-transact')
    .factory('Transaction', [function() {

      var Transaction = function(transaction) {
        var self = this;
        self.Message = null;
        ng.extend(self, transaction);
        return self;
      };

      var MIN_ACCEPTED_LENGTH = 5;

      Transaction.prototype.isValid = function() {
        var _isDefined = ng.isDefined(this.Message);
        var _isString = ng.isString(this.Message);
        var _isBigEnough = (_isDefined && _isString) ? this.Message.length >= MIN_ACCEPTED_LENGTH : false;

        return _isDefined && _isString && _isBigEnough;
      };

      return Transaction;
    }]);

}(window.angular));

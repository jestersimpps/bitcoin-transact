import Promise from 'bluebird';
import request from 'request';
import bitcore from 'bitcore-lib';
import explorers from 'bitcore-explorers';
import bitcoinaddress from 'bitcoin-address';

export default class WalletService {


  static getBalance = (address) => {
    return new Promise((resolve, reject) => {

      if (!bitcoinaddress.validate(address)) {
        return reject('Address checksum failed');
      }
      //get balance using the blockchain api
      const url = 'https://blockchain.info/address/' + address + '?format=json';

      request(url, function(error, response, body) {

        if (error) {
          return reject(error);
        }
        if (response.statusCode !== 200) {
          return reject(response.statusCode);
        }
        let balance = JSON.parse(body);
        resolve(balance);

      });
    });
  }

  static createTransaction = (transaction) => {
    return new Promise((resolve, reject) => {


      const unit = bitcore.Unit;
      const insight = new explorers.Insight();
      const minerFee = unit.fromSatoshis(12800).toSatoshis(); //cost of transaction in satoshis (minerfee)
      const transactionAmount = unit.fromMilis(parseInt(transaction.amount)).toSatoshis(); //convert mBTC to Satoshis using bitcore unit

      if (!bitcoinaddress.validate(transaction.fromaddress)) {
        return reject('Origin address checksum failed');
      }
      if (!bitcoinaddress.validate(transaction.toaddress)) {
        return reject('Recipient address checksum failed');
      }

      insight.getUnspentUtxos(transaction.fromaddress, function(error, utxos) {
        if (error) {
          //any other error
          console.log(error);
          return reject(error);
        } else {

          //if no transactions have happened, there is no balance on the address.
          if (utxos.length == 0) {
            return reject("You don't have enough Satoshis to cover the miner fee.");
          }

          //get balance
          let balance = unit.fromSatoshis(0).toSatoshis();
          for (var i = 0; i < utxos.length; i++) {
            balance += unit.fromSatoshis(parseInt(utxos[i]['satoshis'])).toSatoshis();
          }

          console.log('transactionAmount: ' + transactionAmount);
          console.log('minerFee: ' + minerFee);
          console.log('balance: ' + balance);

          //check whether the balance of the address covers the miner fee
          if ((balance - transactionAmount - minerFee) > 0) {

            //create a new transaction
            try {
              let bitcore_transaction = new bitcore.Transaction()
                .from(utxos)
                .to(transaction.toaddress, transactionAmount) // Send 'transactionAmount' in Satoshi's
                .change(transaction.fromaddress)
                .sign(transaction.privatekey);

              //handle serialization errors
              if (bitcore_transaction.getSerializationError()) {
                let error = bitcore_transaction.getSerializationError().message;
                switch (error) {
                  case 'Some inputs have not been fully signed':
                    return reject('Please check your private key');
                    break;
                  default:
                    return reject(error);
                }
              }

              // broadcast the transaction to the blockchain
              insight.broadcast(bitcore_transaction, function(error, body) {
                if (error) {
                  reject('Error in broadcast: ' + error);
                } else {
                  resolve({
                    transactionId: body
                  });
                }
              });

            } catch (error) {
              return reject(error.message);
            }
          } else {
            return reject("You don't have enough Satoshis to cover the miner fee.");
          }
        }
      });
    });
  }




}

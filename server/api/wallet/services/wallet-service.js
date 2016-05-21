import Promise from 'bluebird';
import request from 'request';
import bitcore from 'bitcore-lib';
import explorers from 'bitcore-explorers';
import bitcoinaddress from 'bitcoin-address';

export default class WalletService {


  static getBalance = (pub_key) => {
    return new Promise((resolve, reject) => {

      if (!bitcoinaddress.validate(pub_key)) {
        return reject('Address checksum failed');
      }
      //get balance using the blockchain api
      //let pub_key = '15CrPRVdNUaXX1DCZqttnP21wyJLTTmy8y';
      const url = 'https://blockchain.info/address/' + pub_key + '?format=json';

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

      const minerFee = 12800; //cost of transaction in satoshis (minerfee)
      const transactionAmount = parseInt(transaction.amount * 100000); //1 mBTC = 100000 satoshis
      const insight = new explorers.Insight();

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
          if (utxos.length == 0) {
            //if no transactions have happened, there is no balance on the address.
            return reject("You don't have enough Satoshis to cover the miner fee.");
          }
          //get balance
          let balance = 0;
          for (var i = 0; i < utxos.length; i++) {
            balance += parseInt(utxos[i]['satoshis']);
          }

          console.log('transactionAmount '+transactionAmount);
          console.log('minerFee '+minerFee);
          console.log('balance '+balance);

          //check whether the balance of the address covers the miner fee
          if ((balance - transactionAmount - minerFee) > 0) {

            //create a new transaction
            try {
              let bitcore_transaction = new bitcore.Transaction()
                .from(utxos)
                .to(transaction.toaddress, transactionAmount) // Send 'transactionAmount' in Satoshi's
                .change(transaction.fromaddress)
                .sign(transaction.privatekey);

              if (bitcore_transaction.getSerializationError()) {
                let error = bitcore_transaction.getSerializationError().message;
                switch (error) {
                  case 'Some inputs have not been fully signed':
                    return reject('Please check your private key');
                    break;
                  default:
                    return reject(error);
                }
                console.log(error);
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

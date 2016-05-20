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

      const minerFee = 667; //cost of transaction
      const transactionAmount = transaction.amount * 100000; //converting mBTC to Satoshis
      const insight = new explorers.Insight();

      if (!bitcoinaddress.validate(transaction.fromaddress)) {
        return reject('Origin address checksum failed');
      }
      if (!bitcoinaddress.validate(transaction.toaddress)) {
        return reject('Recipient address checksum failed');
      }


      insight.getUnspentUtxos(transaction.fromaddress, function(error, utxos) {
        if (error) {
          console.log(error);
          return reject(error);
        } else {
          if (utxos.length == 0) {
            console.log("Not enough Satoshis to cover the miner fee.");
            return reject("Not enough Satoshis to cover the miner fee.");
          } else if (bitcore.Unit.fromBTC(utxos[0].toObject().amount).toSatoshis() - minerFee > minerFee) {
            console.log("We've got enough Satoshis!");
            console.log(utxos[0]);
            let bitcore_transaction = new bitcore.Transaction()
              .from(utxos[0]) // using the last UXTO to sign the next transaction
              .to(transaction.toaddress, transactionAmount - minerFee) // Send 'transactionAmount' Satoshi's
              .addData('coolio') // Our message to Satoshi
              .sign(transaction.privatekey);
            console.log(bitcore_transaction);
            // resolve({
            //   'transaction_hex: ' + bitcore_transaction.checkedSerialize()
            // });
            // insight.broadcast(transaction, function(error, body) {
            //   if (error) {
            //     console.log('Error in broadcast: ' + error);
            //   } else {
            //     console.log("Success! Here's our Transaction ID: " + body);
            //     console.log('http://explorer.chain.com/transactions/' + body + "#!transaction-op-return")
            //   }
            // });
          }

        }
      });




    });
  }




}

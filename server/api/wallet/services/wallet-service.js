import Promise from 'bluebird';
import request from 'request';
import bitcore from 'bitcore-lib';
import explorers from 'bitcore-explorers';

export default class WalletService {


  static getBalance = (pub_key) => {
    return new Promise((resolve, reject) => {

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

      var minerFee = 667; //cost of transaction
      var transactionAmount = transaction.amount * 100000; //converting mBTC to Satoshis
      var insight = new explorers.Insight();

      insight.getUnspentUtxos(transaction.fromaddress, function(error, utxos) {
        console.log('utxos' + ' :' + JSON.stringify(utxos, undefined, 2));
        resolve({
          tx: utxos
        });
      });

      // if (bitcore.Unit.fromBTC(utxos[0].toObject().amount).toSatoshis() - minerFee < transactionAmount ) {
      //   return reject('The origin address doesn\'t have the requested balance');
      // }



    });
  }




}

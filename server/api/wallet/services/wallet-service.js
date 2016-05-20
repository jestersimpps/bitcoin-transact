import Promise from 'bluebird';
import request from 'request';

export default class WalletService {


  static getBalance = (pub_key) => {
    return new Promise((resolve, reject) => {

      //get balance using the blockchain api
      // let pub_key = '15CrPRVdNUaXX1DCZqttnP21wyJLTTmy8y';
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

  static createTransaction = (pub_key) => {
    return new Promise((resolve, reject) => {

      //get balance using the blockchain api
      // let pub_key = '15CrPRVdNUaXX1DCZqttnP21wyJLTTmy8y';
      console.log(pub_key.t);
      const url = 'https://blockchain.info/address/' + pub_key.t + '?format=json';

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




}

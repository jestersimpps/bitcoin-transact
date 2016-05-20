import WalletService from '../services/wallet-service';

export default class WalletController {
  static getBalance(req, res) {
    let pub_key = req.query.pub_key;
    WalletService
      .getBalance(pub_key)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(400).json(error));
  }

  static createTransaction(req, res) {
    let transaction = req.body;
    WalletService
      .createTransaction(transaction)
      .then(data => res.status(201).json(data))
      .catch(error => res.status(400).json(error));
  }


}

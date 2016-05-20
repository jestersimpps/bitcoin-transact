import WalletController from '../controllers/wallet-controller';

export default class WalletRoutes {
  static init(router) {
    router
      .route('/api/wallet')
      .get(WalletController.getBalance)
      .post(WalletController.createTransaction);


  }
}

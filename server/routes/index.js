import TransactionRoutes from '../api/wallet/routes/wallet-routes';
import StaticDispatcher from '../commons/static/index';


export default class Routes {
   static init(app, router) {

     TransactionRoutes.init(router);

     router
       .route('*')
       .get(StaticDispatcher.sendIndex);


     app.use('/', router);
   }
}

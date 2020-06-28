import { Router } from 'express';
import { index as StocksIndex, view as StocksView } from './controller/Stocks';
import { index as CurrencyIndex, view as CurrencyView } from './controller/Currency';

const routes = Router();

routes.get('/currency', CurrencyIndex);
routes.get('/currency/:currencyName', CurrencyView);
routes.get('/stocks', StocksIndex);
routes.get('/stocks/:stockName', StocksView);

export default routes;

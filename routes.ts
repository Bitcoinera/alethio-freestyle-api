import {Router} from 'express';
import { get_smart_contracts_by_transaction } from './api.controller';

const routes = Router();

routes.get('/explore-meta-transaction', get_smart_contracts_by_transaction);
routes.get('/get-account-activity');
routes.get('/monitor-smart-contract');
routes.get('/monitor-account');

export default routes;
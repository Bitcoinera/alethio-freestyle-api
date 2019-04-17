import { Router } from 'express';
import * as ApiController from './api.controller';

const routes = Router();

routes.get('/explore-meta-transaction', ApiController.get_smart_contracts_by_transaction);
routes.get('/get-account-activity', ApiController.get_transaction_log_entries); // ApiController.get_smart_contracts_by_account  ApiController.get_account_transactions
routes.get('/monitor-contract', ApiController.get_contract_transactions); // ApiController.get_contract_messages ApiController.get_contract_log_entries
routes.get('/monitor-account', ApiController.get_account_transactions); // ApiController.get_smart_contracts_by_account

export default routes;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiController = require("./api.controller");
const routes = express_1.Router();
routes.get('/explore-meta-transaction', ApiController.get_smart_contracts_by_transaction);
routes.get('/get-account-activity', ApiController.get_transaction_log_entries); // ApiController.get_smart_contracts_by_account  ApiController.get_account_transactions
routes.get('/monitor-contract', ApiController.get_contract_transactions); // ApiController.get_contract_messages ApiController.get_contract_log_entries
routes.get('/monitor-account', ApiController.get_account_transactions); // ApiController.get_smart_contracts_by_account
exports.default = routes;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
async function get_smart_contracts_by_transaction(req, res, next) {
    const txHash = req.headers.txhash;
    const base_url = process.env.BASE_URL;
    request(`${base_url}/transactions/${txHash}/contractMessages`, (err, response, body) => {
        res
            .json({ statusCode: response.statusCode,
            body: body });
    });
}
exports.get_smart_contracts_by_transaction = get_smart_contracts_by_transaction;
async function get_contract_message_log_entries(req, res, next) {
    const id = req.headers.id;
    const base_url = process.env.BASE_URL;
    request(`${base_url}/contract-messages/${id}/logEntries`, (err, response, body) => {
        res
            .json({ statusCode: response.statusCode,
            body: body });
    });
}
exports.get_contract_message_log_entries = get_contract_message_log_entries;
// export async function get_contract_message_payload(req, res, next) {
//     const id = req.headers.id;
//     const base_url = process.env.BASE_URL;
//     request(`${base_url}/contract-messages/${id}/msgPayload`, (err, response, body) => {
//         res
//             .json({ statusCode: response.statusCode,
//                     body: body })
//     })
// }
async function get_account_transactions(req, res, next) {
    const account = req.headers.account;
    const base_url = process.env.BASE_URL;
    request(`${base_url}/accounts/${account}/transactions`, (err, response, body) => {
        res
            .json({ statusCode: response.statusCode,
            body: body });
    });
}
exports.get_account_transactions = get_account_transactions;
async function get_smart_contracts_by_account(req, res, next) {
    const account = req.headers.account;
    const base_url = process.env.BASE_URL;
    request(`${base_url}/accounts/${account}/contractMessages`, (err, response, body) => {
        res
            .json({ statusCode: response.statusCode,
            body: body });
    });
}
exports.get_smart_contracts_by_account = get_smart_contracts_by_account;
// export async function get_transaction_message_payload(req, res, next) {
//     const txHash = req.headers.txhash;
//     const base_url = process.env.BASE_URL;
//     request(`${base_url}/transactions/${txHash}/msgPayload`, (err, response, body) => {
//         res
//             .json({ statusCode: response.statusCode,
//                     body: body })
//     })
// }
async function get_transaction_log_entries(req, res, next) {
    const txHash = req.headers.txhash;
    const base_url = process.env.BASE_URL;
    request(`${base_url}/transactions/${txHash}/logEntries`, (err, response, body) => {
        res
            .json({ statusCode: response.statusCode,
            body: body });
    });
}
exports.get_transaction_log_entries = get_transaction_log_entries;
async function get_contract_messages(req, res, next) {
    const contractAddress = req.headers.address;
    const base_url = process.env.BASE_URL;
    request(`${base_url}/contracts/${contractAddress}/contractMessages`, (err, response, body) => {
        res
            .json({ statusCode: response.statusCode,
            body: body });
    });
}
exports.get_contract_messages = get_contract_messages;
async function get_contract_log_entries(req, res, next) {
    const contractAddress = req.headers.address;
    const base_url = process.env.BASE_URL;
    request(`${base_url}/contracts/${contractAddress}/logEntries`, (err, response, body) => {
        res
            .json({ statusCode: response.statusCode,
            body: body });
    });
}
exports.get_contract_log_entries = get_contract_log_entries;
async function get_contract_transactions(req, res, next) {
    const contractAddress = req.headers.address;
    const base_url = process.env.BASE_URL;
    request(`${base_url}/contracts/${contractAddress}/transactions`, (err, response, body) => {
        res
            .json({ statusCode: response.statusCode,
            body: body });
    });
}
exports.get_contract_transactions = get_contract_transactions;
// LogEntry.eventDecoded

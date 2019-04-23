"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const base_url = 'https://api.aleth.io/v1';
async function monitor_account_req(req, res) {
    let account = req.headers.account;
    res.json({ msg: 'Please use our UI at localhost:3001' });
}
exports.monitor_account_req = monitor_account_req;
async function monitor_account(account) {
    let response = {
        balance: '0',
        numberTransactions: '0',
        contractMessages: [{
                action: {
                    type: '',
                    blockRank: '',
                    contractCreated: '',
                    inBlock: '',
                    logEntries: '',
                    toAddress: '',
                    txHash: ''
                }
            }],
        links: {
            next: '',
            prev: ''
        }
    };
    return new Promise((resolve, reject) => {
        request(`${base_url}/accounts/${account}`, (err, res, body) => {
            body = JSON.parse(body);
            let balance = parseInt(body.data.attributes.balance) / 1000000000000000000;
            response.balance = balance.toFixed(4); // round up balance to 4 decimal places
            request(`${base_url}/accounts/${account}/transactions`, (err, res, body) => {
                body = JSON.parse(body);
                response.numberTransactions = body.data.length;
                console.log('Number of transactions', body.data.length);
                request(`${base_url}/accounts/${account}/contractMessages`, (err, res, body) => {
                    body = JSON.parse(body);
                    if (body.data.length === 0) {
                        response.contractMessages = null;
                    }
                    else {
                        for (let i = 0; i < body.data.length; i++) {
                            // console.log(`data number ${i}`, body.data[i]);
                            response.contractMessages[i] = {
                                action: {
                                    type: body.data[i].type,
                                    blockRank: body.data[i].attributes.globalRank[1],
                                    contractCreated: body.data[i].relationships.from.data.id,
                                    inBlock: body.data[i].relationships.includedInBlock.data.id,
                                    logEntries: '',
                                    toAddress: body.data[i].relationships.to.data.id,
                                    txHash: body.data[i].relationships.transaction.data.id
                                }
                            };
                        }
                        response.links = {
                            next: body.links.next,
                            prev: body.links.prev
                        };
                    }
                    resolve(response);
                });
            });
        });
    });
}
exports.monitor_account = monitor_account;
const promise = monitor_account('0x4Cf890695E2188a124495EbC3b1Ec6341F21C9CF');
promise.then((result) => { console.log(result), console.log(result['contractMessages']); }, (error) => { console.error(error); });

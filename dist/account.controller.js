"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
let url = `https://api.aleth.io/v1/accounts/`;
function monitor_account(account) {
    let response = {
        balance: '0',
        transactions: [{
                value: '0',
            }],
        contractMessages: [{
                type: '',
                blockRank: '',
                contractCreated: '',
                inBlock: '',
                toAddress: '',
                txHash: ''
            }],
        links: {
            next: '',
            prev: ''
        },
        errorMessage: ''
    };
    return new Promise((resolve, reject) => {
        axios_1.default.get(url + account)
            .then(body => {
            let balance = parseInt(body.data.data.attributes.balance) / 1000000000000000000;
            response.balance = balance.toFixed(4); // round up balance to 4 decimal places
            axios_1.default.get(url + account + '/transactions')
                .then(body => {
                for (let i = 0; i < body.data.data.length; i++) {
                    let txValue = body.data.data[i].attributes.value;
                    txValue = parseInt(txValue) / 1000000000000000000;
                    txValue = txValue.toFixed(4);
                    response.transactions[i] = {
                        value: txValue
                    };
                }
                axios_1.default.get(url + account + '/contractMessages')
                    .then(body => {
                    let data = body.data.data;
                    if (data.length === 0) {
                        response.contractMessages = [];
                    }
                    else {
                        for (let i = 0; i < data.length; i++) {
                            response.contractMessages[i] = {
                                type: data[i].type,
                                blockRank: data[i].attributes.globalRank[1],
                                contractCreated: data[i].relationships.from.data.id,
                                inBlock: data[i].relationships.includedInBlock.data.id,
                                toAddress: data[i].relationships.to.data.id,
                                txHash: data[i].relationships.transaction.data.id
                            };
                        }
                        response.links = {
                            next: body.data.links.next,
                            prev: body.data.links.prev
                        };
                    }
                    resolve(response);
                }, error => {
                    console.error(error.response);
                    response.errorMessage = error.response.data.errors[0].status + ' ' + error.response.data.errors[0].title;
                    resolve(response);
                });
            }, error => {
                console.error(error.response);
                response.errorMessage = error.response.data.errors[0].status + ' ' + error.response.data.errors[0].title;
                resolve(response);
            });
        }, error => {
            console.error(error.response);
            response.errorMessage = error.response.data.errors[0].status + ' ' + error.response.data.errors[0].title;
            resolve(response);
        });
    });
}
exports.monitor_account = monitor_account;
// useful for debugging
const promise = monitor_account('0xd73953bc13c031459f3856a9a5adce36bed18fdc'); // only txns 0xd73953bc13c031459f3856a9a5adce36bed18fdc
promise.then((result) => { console.log(result), console.log(result['contractMessages']); }, (error) => { console.error(error); });

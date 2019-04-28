"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
let url = `https://api.aleth.io/v1/accounts/`;
function monitor_account(account) {
    let response = {
        balance: '0',
        numberTransactions: '0',
        contractMessages: [{
                type: '',
                value: '0',
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
                response.numberTransactions = body.data.data.length.toString();
                if (response.numberTransactions === '10') {
                    response.numberTransactions = '10+  (this feature is a work in progress)';
                }
                let values = [];
                for (let i = 0; i < body.data.data.length; i++) {
                    values[i] = body.data.data[i].attributes.value;
                    values[i] = parseInt(values[i]) / 1000000000000000000;
                    values[i] = values[i].toFixed(4);
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
                                value: values[i],
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
const promise = monitor_account('0x4Cf890695E2188a124495EbC3b1Ec6341F21C9CF'); // only txns 0xd73953bc13c031459f3856a9a5adce36bed18fdc
promise.then((result) => { console.log(result), console.log(result['contractMessages']); }, (error) => { console.error(error); });

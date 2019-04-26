import axios from 'axios';

let url = `https://api.aleth.io/v1/accounts/`; 

export async function monitor_account(account) {
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
        },
        errorMessage: ''
    }

    return new Promise( (resolve, reject) => {
        axios.get( url + account )
            .then( body => {
                let balance = parseInt(body.data.data.attributes.balance) / 1000000000000000000;
                response.balance = balance.toFixed(4); // round up balance to 4 decimal places

            axios.get( url + account + '/transactions')
                .then( body => {
                    response.numberTransactions = body.data.data.length.toString();
                    if ( response.numberTransactions === '10' ) {
                        response.numberTransactions = '10+  (this feature is a work in progress)'
                    }


                axios.get( url + account + '/contractMessages')
                    .then( body => {
                        if (body.data.data.length === 0) {
                            response.contractMessages = null;
                        } else {
                            for ( let i = 0; i < body.data.data.length; i++ ) {
                                response.contractMessages[i] = {
                                    action: {
                                        type: body.data.data[i].type,
                                        blockRank: body.data.data[i].attributes.globalRank[1],
                                        contractCreated: body.data.data[i].relationships.from.data.id,
                                        inBlock: body.data.data[i].relationships.includedInBlock.data.id,
                                        logEntries: '',
                                        toAddress: body.data.data[i].relationships.to.data.id,
                                        txHash: body.data.data[i].relationships.transaction.data.id
                                    }
                                };
                            }
                            response.links = {
                                next: body.data.links.next,
                                prev: body.data.links.prev
                            }
                        }
                        resolve(response);
                    },
                    error => {
                        console.error(error.response);
                        response.errorMessage = error.response.data.errors[0].status + ' ' + error.response.data.errors[0].title; 
                        resolve(response);
                    }) 
            },
            error => {
                console.error(error.response);
                response.errorMessage = error.response.data.errors[0].status + ' ' + error.response.data.errors[0].title; 
                resolve(response);
            }) 
        },
        error => {
            console.error(error.response);
            response.errorMessage = error.response.data.errors[0].status + ' ' + error.response.data.errors[0].title; 
            resolve(response);
        })
    })    
}

const promise = monitor_account('0x4Cf890695E2188a124495EbC3b1Ec6341F21C9C');
promise.then(
    (result) => { console.log(result), console.log(result['contractMessages']) },
    (error) => { console.error(error) }
);
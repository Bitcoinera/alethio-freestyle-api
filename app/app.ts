import * as AccountController from '../dist/account.controller.js';
import * as ChartRenderer from '../dist/graphs.js'; 

let input = (<HTMLInputElement>document.getElementById('account'));
let divError = document.getElementById('error');
let responseUl = document.getElementById('response');
let inputButton = document.getElementById('button');
let toggleButton = document.getElementById('toggle-activities');

// account with con contract msgs 0x4Cf890695E2188a124495EbC3b1Ec6341F21C9CF & another one 0x829bd824b016326a401d083b33d092293333a830
// account with no contract msgs but txns 0xd73953bc13c031459f3856a9a5adce36bed18fdc
// account with only 2 contract messages 0xb7605ddc0327406a7ac225b9de87865e22ac5927

inputButton.addEventListener('click', async () => {

    AccountController.monitor_account(input.value)
        .then( (values) => {
            // empty input text content
            input.value = '';
            // clear error message if there is one
            let errors = document.querySelectorAll('p.error');
            if ( errors.length > 0 ) {
                errors.forEach( (error) => {
                    divError.removeChild(error);
                })
            }
            // handling error
            if ( values['errorMessage'] !== '' ) {
                let errorDomString =  `<p class="error">An error occurred!</p><p class="error">${values['errorMessage']}</p>`;
                divError.innerHTML = errorDomString;
            } else {
                // handle length when there are over 10 txns and contmsgs
                values['transactions'].lengthOther = values['transactions'].length;
                values['contractMessages'].lengthOther = values['contractMessages'].length;
                if ( values['transactions'].length === 10 ) {
                    values['transactions'].lengthOther = `10(+)<p>Ten last transactions in order are:</p>`
                }
                if ( values['contractMessages'].length === 10 ) {
                    values['contractMessages'].lengthOther = '10(+)<p>Ten last messages in order are:</p>'
                }
                // create all displayed data
                let domString = `
                <h4>General Stats</h4>
                <li>Balance: ${values['balance']} ETH</li>
                <h4>Transactions Stats</h4>
                <p>Total number of transactions: ${values['transactions'].lengthOther}</p>
                `;
                values['transactions'].forEach( (txn, index) => {
                    domString = domString + `
                    <li>Txn ${index}: ${txn.value} ETH</li> 
                    `;
                })

                domString = domString + `<div id="graphs">
                    <canvas id="txnChart" width="400" height="200"></canvas>
                </div>
                <h4>Activities Stats</h4>
                <p>Total number of contract messages: ${values['contractMessages'].lengthOther}</p>
                `;
                
                values['contractMessages'].forEach( (contractMessage, index) => {
                    domString = domString + `
                    <p>------> Activity Number ${index}</p>
                    <li class="activity">Type of action: ${contractMessage.type}</li>
                    <li class="activity">ETH Value: ${contractMessage.value}</li>
                    <li class="activity">Block rank: ${contractMessage.blockRank}</li>
                    <li class="activity">Hash of the contract: ${contractMessage.contractCreated}</li>
                    <li class="activity">Recipient address: ${contractMessage.toAddress}</li>
                    <li class="activity">Transaction hash: ${contractMessage.txHash}</li>
                    <li class="activity">Block hash where txn occurred: ${contractMessage.inBlock}</li>
                    `;
                })
                responseUl.innerHTML = domString;
            }

            let canvas = <HTMLCanvasElement>document.getElementById('txnChart')
            // call chart function
            ChartRenderer.renderChart(values, canvas)
            
        })
        .catch( (err) => {
            console.error(err);
            let errorDomString =  `<p class="error">An error occurred!</p>`;
            divError.innerHTML = errorDomString;
        })
})

toggleButton.addEventListener('click', () => {
    let lis = <HTMLElement[]><any>document.querySelectorAll('li.activity');
    if ( lis.length > 0 ) {
        lis.forEach( li => {
            if ( li.style.display === 'none' ) {
                li.style.display = 'block';
            } else {
                li.style.display = 'none';
            }
        })
    } else {
        console.log('No li elements to hide'); // No activities to hide
    }
})



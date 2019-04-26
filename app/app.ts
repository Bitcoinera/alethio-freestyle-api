import * as AccountController from '../dist/account.controller.js';

let input = (<HTMLInputElement>document.getElementById('account'));
let divInput = document.getElementById('input');
let responseUl = document.getElementById('response');
let inputButton = document.getElementById('button');
let toggleButton = document.getElementById('toggle-activities');
// account no contract msgs 0x84b50E8A5F0A3d28C10253d8B373882374c0FF89
// account with con contract msgs 0x4Cf890695E2188a124495EbC3b1Ec6341F21C9CF & another one 0x829bd824b016326a401d083b33d092293333a830

inputButton.addEventListener('click', async () => {

    await AccountController.monitor_account(input.value)
        .then( (values) => {
            input.value = ''; // empty input text content
            // handling error
            if ( values['errorMessage'] !== '' ) {
                let pError = document.createElement('p');
                pError.setAttribute('class', 'error');
                pError.innerHTML=  `An error occurred! <p>${values['errorMessage']}</p>`;
                divInput.appendChild(pError);
            } else {
                let domString = `
                <h5>General Stats</h5>
                <li>Balance: ${values['balance']} ETH</li>
                <li>Number of transactions: ${values['numberTransactions']}</li>
                <h5>Activity Stats</h5>
                <p>There are ${values['contractMessages'].length} contract messages or transactions in total</p>
                `;
                
                values['contractMessages'].forEach( (contractMessage, index) => {
                    domString = domString + `
                    <p>------> Activity Number ${index}</p>
                    <li class="activity">Type of action: ${contractMessage.action.type}</li>
                    <li class="activity">Block rank: ${contractMessage.action.blockRank}</li>
                    <li class="activity">Hash of the created contract: ${contractMessage.action.contractCreated}</li>
                    <li class="activity">Recipient address: ${contractMessage.action.toAddress}</li>
                    <li class="activity">Transaction hash: ${contractMessage.action.txHash}</li>
                    <li class="activity">Hash of the block where contract was created: ${contractMessage.action.inBlock}</li>
                    <li class="activity">Log entries: ${contractMessage.action.logEntries}</li>
                    `;
                })
                responseUl.innerHTML = domString;
            }            
        })
        .catch( (err) => {
            console.error(err);
            let pError = document.createElement('p');
            pError.setAttribute('class', 'error');
            pError.innerHTML=  'An error occurred!';
            divInput.appendChild(pError);
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



import * as AccountController from '../dist/account.controller.js';

let input = (<HTMLInputElement>document.getElementById('account'));
let responseUl = document.getElementById('response');
let inputButton = document.getElementById('button');
let toggleButton = document.getElementById('toggle-activities');
let values;
// account no contract msgs 0x84b50E8A5F0A3d28C10253d8B373882374c0FF89
// account with con contract msgs 0x4Cf890695E2188a124495EbC3b1Ec6341F21C9CF

inputButton.addEventListener('click', async () => {
    values = await AccountController.monitor_account(input.value);
    if (values) {
        var domString = `
        <h5>General Stats</h5>
        <li>Balance: ${values.balance} ETH</li>
        <li>Number of transactions: ${values.numberTransactions}</li>
        <h5>Activity Stats</h5>
        <p>There are ${values.contractMessages.length} contract messages or transactions in total</p>
        `;

        values.contractMessages.forEach( (contractMessage, index) => {
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
   AccountController.monitor_account(input.value);
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



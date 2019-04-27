import * as AccountController from './dist/account.controller.js';
import * as Chart from 'chart.js';

export async function renderChart(values, canvas) {
    return new Promise( (resolve, reject) => {
        let myChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['0 txn','1 txn', '2 txn', '3 txn', '4 txn', '5 txn', '6 txn', '7 txn', '8 txn', '9 txn'],
                datasets: [{
                        label: 'ETH value of txns',
                        data: [values['contractMessages'][0].value,
                        values['contractMessages'][1].value, 
                        values['contractMessages'][2].value, 
                        values['contractMessages'][3].value, 
                        values['contractMessages'][4].value, 
                        values['contractMessages'][5].value, 
                        values['contractMessages'][6].value, 
                        values['contractMessages'][7].value, 
                        values['contractMessages'][8].value,
                        values['contractMessages'][9].value 
                    ],
                        borderColor: 'blue',
                        fill: false
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
        resolve(myChart);
    })
}

   
    

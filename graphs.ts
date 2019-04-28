import * as Chart from 'chart.js';

export function renderChart(values, canvas) {
    let contractMessages = values.contractMessages;
    if ( contractMessages.length > 0 ) {
        return new Promise( (resolve, reject) => {
            // create array for data displayed
            contractMessages = contractMessages.map( contractMessage => contractMessage.value );
            // create array for labels on the x axis
            let contMsgsLabels = [];
            contractMessages.forEach( (contractMessage, index) => {
                contMsgsLabels.push(`${index} txn`);
            } )
            // chart config
            let contMsgsChart = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: contMsgsLabels,
                    datasets: [{
                            label: 'ETH value of txns',
                            data: contractMessages,
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
            resolve(contMsgsChart);
        })
    }
}

   
    

const rp = require('request-promise');

module.exports = async function() {
    const originalTansaction = 'https://7np770qqk5.execute-api.eu-west-1.amazonaws.com/prod/get-transaction';
    
    var options = {
        uri: originalTansaction,
        json: true
    };

    const rates = 'https://api.exchangeratesapi.io/latest';

    var opt = {
        uri: rates,
        json: true,
    };

    let transaction = await(rp(options));
    let amount = transaction.amount;
    let currency = transaction.currency;
    let curRates = await(rp(opt));
    transaction.convertedAmount = convertedAmount();
    
    function convertedAmount(){
        let result = (amount / curRates.rates[currency]);
        if(result % 1 !== 0) {
            return +result.toFixed(4);
        }
        
    }

    console.log(transaction);

    
};
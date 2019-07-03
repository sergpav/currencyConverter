const rp = require('request-promise');

module.exports = async function() {
    const originalTansaction = 'https://7np770qqk5.execute-api.eu-west-1.amazonaws.com/prod/get-transaction';
    
    var options = {
        uri: originalTansaction,
        json: true
    };
    

    let transaction = await(rp(options));
    
    let operationDate = new Date(transaction.createdAt);
    let operationDateFormat = (operationDate.getFullYear()+"-"+(operationDate.getMonth()+1)+"-"+(operationDate.getDate()));

    const rates = 'https://api.exchangeratesapi.io/'+operationDateFormat;

    var opt = {
        uri: rates,
        json: true,
    };

    delete transaction.exchangeUrl;
    let amount = transaction.amount;
    let currency = transaction.currency;
    let curRates = await(rp(opt));
    transaction.convertedAmount = parseFloat(convertedAmount());
    
    function convertedAmount(){
        let result = (amount / curRates.rates[currency]);
        if (result % 1 !== 0) {
            return +result.toFixed(4);
        }
    }

    transaction = {"transactions": [transaction]};

    return transaction;
    
};
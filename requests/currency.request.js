const rp = require('request-promise');

module.exports = async function() {

    function convertedAmount(amount, currency, curRates){
        let result = (amount / curRates.rates[currency]);
        if (result % 1 !== 0) {
            return +result.toFixed(4);
        }
    }
    let trans = []; 
    for(let i = 0; i < 1; i++) {
        const originalTansaction = process.env.SERVICE_ENDPOIT;    
        let transaction = await(rp({uri: originalTansaction, json:true})); //get transaction
        let operationDate = new Date(transaction.createdAt); //get time of trasaction
        let operationDateFormat = (operationDate.getFullYear()+"-"+(operationDate.getMonth()+1)+"-"+(operationDate.getDate()));
        const rates = process.env.RATES_URL+operationDateFormat; //get rates from api
        delete transaction.exchangeUrl;
        let amount = transaction.amount;
        let currency = transaction.currency;
        let curRates = await(rp({uri:rates, json:true}));
        transaction.convertedAmount = convertedAmount(amount, currency, curRates);
        trans.push(transaction);
    }

    data = {"transactions": trans};

    return data;
    
};
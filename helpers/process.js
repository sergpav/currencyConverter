const   currencyRequest = require('../requests/currency.request'),
        request = require('request');

module.exports.transactions = () => new Promise(async (resolve, reject) => {
    let data = await currencyRequest(),
        options = {
            uri: 'https://7np770qqk5.execute-api.eu-west-1.amazonaws.com/prod/process-transactions',
            method: 'POST',
            json: data
        };
    request(options, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            let arr = {'body':JSON.stringify(body), 'data':JSON.stringify(data)};
            resolve(arr);
        } else if (err) {
            reject({ error: err });
        }
    });
});
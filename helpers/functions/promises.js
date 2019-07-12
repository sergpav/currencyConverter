const   transaction = require('../transaction'),
        getData = require('./get.data');

module.exports = () => new Promise( (reslove, reject) => {
    let promiseChain = [];
    for(let i = 0; i < 100; i++) {
        promiseChain.push(transaction.trans());
    }

    Promise.all(promiseChain).then(async(data) => {
        let responseJSON = {"transactions": data};
        let responseData = await getData(process.env.PROCESS_ENDPOINT, responseJSON, 'POST');
        let response = {response : JSON.stringify(responseData), request: JSON.stringify(data)};
        reslove(response);
    });
})
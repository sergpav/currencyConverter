module.exports = (response) => {
    let operationDate = new Date(response.createdAt); //get time of trasaction
    let operationDateFormat = (operationDate.getFullYear()+"-"+(operationDate.getMonth()+1)+"-"+(operationDate.getDate()));
    let ratesUrl = process.env.RATES_URL+operationDateFormat;
    delete Object.assign(response, {"convertedAmount": response.exchangeUrl}).exchangeUrl;// replace key exchangeUrl to amount 
    let formated = {'url': ratesUrl, 'data' : response};
   
    return formated;
};
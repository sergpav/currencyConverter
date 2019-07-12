module.exports = (data, rates) => {
    let convertedAmount = data.amount / rates[data.currency];
    if (convertedAmount % 1 !== 0) {
        convertedAmount = +convertedAmount.toFixed(4);
    }
    data.convertedAmount = +convertedAmount;

    return data;
}
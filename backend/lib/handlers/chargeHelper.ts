require('stripe')('secret key');

exports.createCharge = function (amount: number, stripeToken: any) {
    const chargeData = getChargeData(amount, stripeToken);
    return stripe.charges.create(chargeData)
       .then(res => res)
       .catch(err => err)
};
 
function getChargeData (amount:number, stripeToken:any) {
    const amountInPence = amount * 100;
    return {
       amount: amountInPence,
       currency: 'usd',
       source: stripeToken,
       capture: false
    }
 }
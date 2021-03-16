require('stripe')('secret key');


export function makeOrderCreation(req, res, next, orderCharge) {
    return createOrder(req, res, next).then(order => {
       res.status(200).json(order).end();
       stripe.charges.capture(charge.id)
          .then(res => res)
          .catch(err => err)
    }
 }).catch((err) => {
       res.status(400).json(err).end();
       stripe.refunds.create({charge: charge.id})
         .then(res => res)
         .catch(err => err);
});
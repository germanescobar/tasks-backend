const epayco = require('epayco-sdk-node')({
  apiKey: '0756c69088b6ac9c8a996cb9f91adaf3',
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true
})

const User = require('../user/user.model')
const Payment = require('./payment.model')

async function createCard(req, res) {
  const cardInfo = req.body
  try{
    const token = await epayco.token.create(cardInfo)
    res.status(201).json({token})
  } catch(error) {
    console.log('error', error)
    res.status(500).send(error)
  }
}

async function createCustomer(req, res) {
  const customerInfo = req.body
  const user = req.user

  try{
    const customer = await epayco.customers.create(customerInfo)
    const { data: { customerId } } = customer

    // Update user
    const filter = { _id: user._id };
    const update = { epaycoCustomerId: customerId };

    await User.findOneAndUpdate(filter, update)

    res.status(201).json({customer})
  } catch(error) {
    console.log('error', error)
    res.status(500).send(error)
  }
}

async function getCustomer(req, res) {
  const {id: customerId} = req.params
  try{
    const customer = await epayco.customers.get(customerId)
    res.status(201).json({customer})
  } catch(error) {
    console.log('error', error)
    res.status(500).send(error)
  }
}

async function charge(req, res) {
  const paymentInfo = req.body
  const user = req.user

  // de donde obtengo el customerId?
  // de donde obtengo el token_card?

  try{
    const {data: charge} = await epayco.charge.create(paymentInfo)

    const newPayment = new Payment({
      ...charge,
      userId: user._id,
      epaycoCustomerId: user.epaycoCustomerId,
    })
    const payment = await newPayment.save()

    res.status(201).json({payment})
  } catch(error) {
    console.log('error', error)
    res.status(500).send(error)
  }
}

async function getCharge(req, res) {
  const {id: transactionId} = req.params
  try{
    const charge = await epayco.charge.get(transactionId)
    res.status(201).json({charge})
  } catch(error) {
    console.log('error', error)
    res.status(500).send(error)
  }
}

async function getTotalPayments(req, res) {
  const user = req.user
  try{
    const payments = await Payment.aggregate([
      {
        $match: {
          userId: user._id
        }
      },
      {
        $group: {
          _id: '$userId',
          total: { $sum: '$valor' }
        }
      }
    ])
    res.status(201).json({payments})
  } catch(error) {
    console.log('error', error)
    res.status(500).send(error)
  }
}

module.exports = {
  createCard,
  createCustomer,
  charge,
  getCustomer,
  getCharge,
  getTotalPayments
}

require('dotenv').config()
const epayco = require('epayco-sdk-node')({
  apiKey: 'de409dfebc25885adcc5e8f41fc75ad5',
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true
})


async function createCardToken(req, res) {
  const credit_info = {
    "card[number]": "4575623182290326",
    "card[exp_year]": "2025",
    "card[exp_month]": "12",
    "card[cvc]": "123"
  }

  try {
    const data = await epayco.token.create(credit_info)
    res.status(200).send({
      data: data
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error al crear el token',
      error,
    })
  }
}

async function createCustomer(req, res) {
  const customer_info = req.body

  try {
    const data = await epayco.customers.create(customer_info)
    res.status(200).send({
      data: data
    })
  } catch (error) {
    console.log("🚀 ~ file: checkout.controller.js ~ line 40 ~ createCustomer ~ error", error)
    res.status(500).send({
      message: 'Error al crear el customer',
      error,
    })
  }
}

async function getCustomer(req, res) {
  const id_customer = req.body

  try {
    const data = await epayco.customers.get(id_customer)
    res.status(200).send({
      data: data
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error al obtener el customer',
      error,
    })
  }
}

async function payment(req, res) {
  const payment_info = req.body

  try {
    const data = await epayco.charge.create(payment_info)
    res.status(200).send({
      data: data
    })
  } catch (error) {
    console.log("🚀 ~ file: checkout.controller.js ~ line 40 ~ createCustomer ~ error", error)
    res.status(500).send({
      message: 'Error al crear el customer',
      error,
    })
  }
}

module.exports = {
  createCardToken,
  getCustomer,
  createCustomer,
  payment
}

// Controller

function index(req, res) {
  return res.status(200).json({message: 'helloworld'})
}

module.exports = {
  index
}

const mongoose = require('mongoose');

async function connectDB() {
  mongoose.connect(
    process.env.MONGO_URI, {
      useNewUrlParser: true
    }
  );

  mongoose.connection.on('error', function (e) {
    console.error(e);
    process.exit(-1)
  });
}

module.exports = connectDB

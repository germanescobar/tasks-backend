const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    match: /.+\@.+\..+/,
    required: [true, 'El email es requerido'],
    validate: {
      validator: async function (value) {
        const user = await User.findOne({ email: value });
        return user === null;
      },
      message: 'Email duplicado',
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
});

userSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.statics.authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    return result === true ? user : null;
  }

  return null;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

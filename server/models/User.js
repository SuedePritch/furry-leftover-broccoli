const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Order = require('./Order')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    creditCard: {
      type: Number,
      required: false,
      //validates a creditcard number can validate visa, mastercard and amex numbers //
      match: [/^(?:4\d{3}|5[1-5]\d{2}|6011|3[47]\d{2})([-\s]?)\d{4}\1\d{4}\1\d{3,4}$/, 'must use valid credit card number'],
    },
    // set true for admin user
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    // set true for a premium client
    premium: {
      type: Boolean,
      required: false,
      default: false,
    },
    //order history
    orders: [Order.schema],
    }
);

// hash user password and/or credit card number
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  if (this.isNew || this.isModified('creditCard')) {
    const saltRounds = 10;
    this.creditCard = await bcrypt.hash(this.creditCard, saltRounds);
  }
  next();
});


// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

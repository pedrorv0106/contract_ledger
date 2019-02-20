const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('users', UsersSchema);

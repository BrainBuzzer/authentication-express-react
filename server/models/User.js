var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: {type: String, required: true },
  password: {type: String, required: true }
})

module.exports = mongoose.model('User', User);
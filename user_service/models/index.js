var mongoose = require('mongoose');

var user = mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    value : {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('User', user);
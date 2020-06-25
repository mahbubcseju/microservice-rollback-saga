var mongoose = require('mongoose');

var item = mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
    count : {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('Item', item);
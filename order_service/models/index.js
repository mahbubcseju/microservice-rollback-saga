var mongoose = require('mongoose');

var item = mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    count : {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model('Item', item);
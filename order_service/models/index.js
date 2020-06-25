var mongoose = require('mongoose');

var item = mongoose.Schema({
    id: {
        type: String,
        unique: true,
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

module.exports = mongoose.model('Items', item);
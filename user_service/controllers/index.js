const Service = require("../Services");
const User = require("../models");

exports.get_user_balance = function(req, res) {
    Service.clearQueue();
    User.findOne({email: req.params.email }, function(err, response) {
        if(err) {
            res.status(500).send({
                'Error': 'Server Error'
            });
        }else {
            res.send({
                'data': response.value
            })
        }
    })
};

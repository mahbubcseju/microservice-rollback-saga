const config = require('../../const');
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});



exports.orderItem = function(req, res) {
    res.send("Happy bara");

};

exports.increaseValue = function(req, res) {
    var params = {
        MessageAttributes: {
            "email": {
                DataType: "String",
                StringValue: req.body.email
            },
            "value": {
                DataType: "Number",
                StringValue: req.body.value
            }
        },
        MessageBody: "Increase",
        QueueUrl: config.SQS_QUEUE_URL
     };

     sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            res.send({
                data: "Success",
            })
        }
    });
};